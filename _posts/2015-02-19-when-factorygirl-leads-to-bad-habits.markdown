---
layout: post
title: "When FactoryGirl leads to bad habits"
tags: [rails]
lang: en
---

[FactoryGirl](https://github.com/thoughtbot/factory_girl) is a solution for cleaning up the repetitive task of
setting up test data, used in many Rails projects.

I think FactoryGirl encourages bad design by hiding design problems.

The need for repetitive or complex test-data is an indication that your code and its API need improvement. Instead of improving the application, FactoryGirl enables you to only improve this in your test suite: that is not fixing at all, it is hiding the problem.

## Building up a state before we can test

We have an app that measures fuel-usage. The feature, or integration test for inserting a
"measurement" could be something like this, when not using FactoryGirl, we can immediately see a problem: (the testing framework is irrelevant here, so I am using RSpec to minimize the noise because it allows me to be concise)

{% highlight ruby %}
scenario: 'secretary on a project with cars adds new fuel-usage entries and sees them' do
  project = Project.create(name: 'new bridge in sahara', starts_on: Date.today.beginning_of_year, ends_on: Date.today.end_of_year)
  user = User.create(email: 'speedy-joe@example.com', password: 'secret', password_confirmation: 'secret')
  user.roles.create(name: 'secretary', on: project)
  Resource.new(type: :car, slug: '13-37-42', name: 'Joes Truck', project: project)
  sign_in user

  visit("projects/#{project.id}/resources/#{car.id}/entries/new")
  fill_in('Measurement', with: 12)
  click_button('Create Measurement')
  expect(page).to have_content("#{Date.today}: 12 liter")
end
{% endhighlight %}

If you consider that only the last four lines are relevant for this
test,the first block is just noisy set-up. Now, we could refactor this
into a before-block in RSpec. Or into a helper method
`create_project_with_secretary_and_car`. But that is what FactoryGirl
does for us, with a much nicer interface then such ad-hoc helpers. With FactoryGirl
the test could look like:

{% highlight ruby %}
scenario: 'secretary on a project with cars adds new fuel-usage entries and sees them' do
  user = create(:user_on_project, role_name: 'secretary')
  create(:car, project: user.project)
  sign_in user

  visit("projects/#{project.id}/resources/#{car.id}/entries/new")
  fill_in('Measurement', with: 12)
  click_button('Create Measurement')
  expect(page).to have_content("#{Date.today}: 12 liter")
end
{% endhighlight %}

The first benefit becomes clear because we see far fewer lines of irrelevant objects being created.
The second benefit of FactoryGirl immediately becomes clear too: we no longer need to provide irrelevant attributes such as the project name.

We have, however not fixed the our application, the implementation is still clumsy; our applications API is still unfriendly. A rake task, an "import"-job, a REST-client still needs to walk through (or consider the state of) all the other records.

If you consider your tests to be one (important) user of your API, a client, the problem is clear: we need to fix the application, not the client using that API.

{% highlight ruby %}
scenario: 'secretary on a project with cars adds new fuel-usage entries and sees them' do
  resource = Car.new('Joes Truck')
  project = Project.create(name: 'New Bridge', resources: [resource])
  user = Secretary.create(email: 'speedy-joe@example.com', password: 'secret', project: project)
  sign_in user

  visit("projects/#{project.id}/resources/#{car.id}/entries/new")
  fill_in('Measurement', with: 12)
  click_button('Create Measurement')
  expect(page).to have_content("#{Date.today}: 12 liter")
end
{% endhighlight %}

We have added code to our application that is used by one of the
clients: the tests. We have abstracted some of the details away: a
client does not need to know how we have implemented roles. For
example: we can use `Car` to build a resource, which takes care of
creating a slug, and setting other defaults. If, instead we created some
"car" trait in FactoryGirl, that effort was "wasted" on our app. Worse:
we still maintain knowledge about how "resource" deals with cars in our
test suite. That knowledge is merely centralised in a FactoryGirl file,
but still lives in the client: the tests-suite. Again worse: if your
trait happens to be "helpful" and create a `Project` too, the factories
become unpredictable. I've spent many hours debugging tests only to find
out that some factory "helpfully" created its own relations: leaving me
with "why the hell are there three Projects, all in a different state, when I thought I created only one?"

As with any good API-design, you want your clients to remain as dumb as possible. You certainly don't want a client having to know how projects, roles, users, resources and so on are related to one another.

In the last example, we have improved our application. Introduced useful defaults, additional, useful models all of which are immediately used by at least one
user of the code: the tests.

Other users can start using these `Secretary` or `Car` models and the automatic defaults on `Projects` too, now. They allow us to clean up code that used the clumsy interface: controllers, rake-tasks, async-workers and so on.

Quite often, I've found that by removing the usage of a
`FactoryGirl.create` in a test, I could improve not only the code under
test, but a lot of other places in the application too: Suddenly you
realize that the "case param[:resource_type]" in your controller can be
completely removed and replaced with a few smart calls to `Car.new` and
`Boat.new` and so on. It even, quite often, resulted in improvements of
the UX: by setting sane defaults, instead of presenting the user with a
"starts on is a required field" we save it and set a default. All this
because we learned from our tests that the code had some issues. All
this we would not have learned if instead we cleaned up the tests with
FactoryGirl.

## Unit testing
I'd argue that with Unit tests there is even more reason not to use
FactoryGirl. I often go as far as to forbid the usage of FactoryGirl
in unit-tests.

First of all, there is the "unit" part of the unit test: A test for
Role, applies to Role alone. If you, somehow need to store a User with
every Role, in order to test that Role, you have tightly coupled code.
When your Role cannot live without a User (or Vice Versa), you don't have
a `Role` and a `User`, but a `UserWithRole` unit. Since we want
decoupled code (we want decoupled code, don't we?) getting into this
mess is something to avoid. FactoryGirl does not help you to avoid this,
it even encourages this design somewhat:

{% highlight ruby %}
describe User do
  describe '#function' do
    it 'includes the name of the role and its project' do
      user = create(:user, :secretary_on_project)
      expect(user.name).to be 'Secretary for New Bridge'
    end
  end
end

class User
  def function
    roles.map { |r| "#{r.name} for #{r.project.name}" }.join(',')
  end
end
{% endhighlight %}

This looks like a nice, clean test. But only because we have hidden away
all the complexity of coming to a state in which the user has a role and
a project and both have a name. And because the test looks nice and clean, we might think we
are done. We are not: One line of code with four issues (and
probably actual bugs):

* It cannot deal with a user that has no roles.
* It cannot deal with a user with roles which have no project.
* It will render strange texts when a role or a project has no name.
* The User is dealing with attributes on roles, and even attributes on
  that roles' attributes (Law of Demeter).

> Sidenote: a method like `function` should, IMO not be part of the Model,
> but is presentation and should either live in the views, or in some
> decorator or presentation double `UserPrester`. For the sake of the
> example, let's leave it here, just note that our tests are telling us
> this too: we are creating a presentable name in an object that deals
> wit details wit database-state: we are violating the Single
> Responsibility Principle.

When I recently encountered several of these exact issues in one of my projects' codebase, the developers argued that the
solution was to add more "validation". "Yea, but our models
require a role and each role requires a project. And we are only
rendering stored users, so this should never happen".

It will happen, when you render the unstored role back on the screen when there validation-issues on storing the
user, or its role. Or when deleting a project and not dealing correctly with deleting the associated roles and users.

When you test with a clean, predefined set of test-data, you won't notice all such edge cases. But when you test with the simplest and most extreme edge case: an unstored, empty `User`, most, if not all, these problems will be avoided; in the design, rather then in validations, delete-hooks, checking-for-nil in views and so on.

If we had tested without FactoryGirl, it would have looked something
like this:

{% highlight ruby %}
describe '#function' do
  before { @user = User.new } # In RSpec, this is returned when using the method 'subject'
  context 'when user has roles' do
    before { @user.roles = [Struct.new(name: 'Secretary')] }
    it 'includes the name of the role' do
      expect(@user.function).to be 'Secretary'
    end

    context 'when role has project' do
      before { @user.roles = [Struct.new(name: 'Secretary', project: Struct.new(name: 'New Bridge'))] }
      it 'includes the name of the project' do
        expect(@user.function).to be 'New Bridge'
      end
    end
  end
  context 'when user has no roles' do
    it 'is "no function"' do
      expect(@user.function).to be 'no function'
    end
  end
end
{% endhighlight %}

Now our tests tell us about the problems:

* We explicitly have to deal with the situation when a user has no roles.
* We see clearly that the "function" is reaching too deep, through roles
  into the project.

Because it is made clear, we can now fix that:

{% highlight ruby %}
describe '#function' do
  context 'when user has roles' do
    before { subject.roles = [Struct.new(as_function: 'Secretary on New Bridge')] }
      it 'includes role as a function' do
      expect(subject.function).to be 'Secretary on New Bridge'
    end
  end
  context 'when user has no roles' do
    it { expect(subject.function).to be 'no function' }
  end
end
{% endhighlight %}

The tests are clean, and explain very well how we deal with edge cases.
Because we have minimized the issues appearing in edge cases and because
we have delegated the methods to the right objects.

{% highlight ruby %}
class User
  def function
    return 'no function' unless roles
    roles.map(:as_function).join(', ')
  end
end
class Role
  def as_function
    return 'no project' unless project
    "#{name} on #{project.name}"
  end
end
{% endhighlight %}

We have now clearly improved our code, not just the tests. Bonus: since we no
longer have to store stuff in the database, our unit-test is much faster now.

> Sidenote: `subject.roles = [Struct.new]` or `subject.roles =
> [double(:role)]` is a way of mocking the `Role`: a User, nor its
> unit-test, needs to know how 'Role' exactly works, making that
> explicitly clear in a test is often considered a good practice. Yet
> mocking and stubbing itself has a lot of downsides too. That is beyond
> this post. One important thing, though: this code, when using
> ActiveRecord Relations, will not work, since AR does not allow `roles`
> to be assigned anything other then a list of `Roles`: passing in a
> double or Struct will cause an exception. I use `mock_model()` to fix
> this.

Whether you consider a controller a unit and test it as such, or whether
you test it in a more "integration" makes little difference for the
usage of FactoryGirl. A controller [tested as
unit](http://mixandgo.com/blog/how-to-test-controllers-in-rails), has no
interaction with the database at all: so it really needs no FactoryGirl.
When you test a controller and let it go through the database, that
database needs state. But the above "feature test" examples apply here
even more: if a certain controller action needs a lot of records
in the database before it "can work", the problem lies there, not in
your tests which create all these records.

## Don't hide problems, fix them.
FactoryGirl is a solution for hiding problems with your application and
its API. When a test tells you that the API is clumsy, or dirty, instead
of fixing that API, FactoryGirl encourages you to hide this problem.

I'd argue that when some test needs 20+ records created before it can
run, it is far better to leave these 20+ lines of code creating these
records in your tests. At least you then admit and document the problem
you have. Refactoring them with FactoryGirl makes it appear as if there
is no problem with your application code. This is even more true for
unit-tests that use FactoryGirl.

## When to use FactoryGirl?
Is it completely useless and should you never use it then? No, it has a
very good usecase: when your API does demand complex state, or lots of
repetitive attributes. When your `Order` requires a `ShippingAddress`, it is poor
practice to hide this away in factories. Even more so in the unit-tests
of `Order`. Instead consider introducing a `ShippedOrder` model a
'OrderBuilder` service-object or an `Order.create_with_address()` helper
even. Improve the API of your application.

I also want to give a shout-out to the developers of FactoryGirl: I've
used it with great pleasure to replace Rails core -even more clumsy-
fixtures. Please don't read this as an attack on FactoryGirl and its
developers, it are personal observations on using a "test data framework".

But when Address requires you to type your address over and over in your
tests, then FactoryGirl is a nice DSL to put the "generating a street,
city and postal code" in a central place. After all: generating this, is
part of the task of the client, not the API. FactoryGirl is a fancy
solution for creating such data. But since factorygirl is very tightly
coupled to the database and the models that represent that database, it
is way more.
When you need an "address data" in your tests, you could just as well
add a small helper:


{% highlight ruby %}
class LoremIzer
  def address
    { street: 'Diagon Alley',
      number: '13a',
      city: 'London',
      postal_code: '1337'}
  end
end
{% endhighlight %}

It is only when such helpers grow large and wieldy: when they start to
turn into a framework, that FactoryGirl (or another [data generation
gem](https://github.com/EmmanuelOga/ffaker) has a good place in your app.
