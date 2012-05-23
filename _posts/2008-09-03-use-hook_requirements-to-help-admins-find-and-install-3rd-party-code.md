---
layout: post_archive
title: Use hook_requirements to help admins find and install 3rd party code
created: 1220445872
tags:
- Project Management
- PHP
- Library
- Drupal Talk
- Drupal
lang: en
---
A handy snippet for module developers that use external libraries. 
Drupal discourages inclusion of such libraries in modules, [for good reasons](http://drupal.org/node/103704). This, however, makes is hard for admins to install your module. 
I used [hook_requirements](http://api.drupal.org/api/function/hook_requirements/5/) to point out how, why and where a certain library can be found.


![screeenshot of the help](http://webschuur.com/files/status_report.png)
<br class="clear"/>
The admin is then helped with usefull messages: how to fix the problem. 

<!--break-->

    /**
    * Implementation of hook_requirements.
    */
    function belbios_requirements($phase) {
      $requirements = array();

      if ($phase == 'runtime') {
        //Check for availability of include
        $path = drupal_get_path('module', 'belbios'). '/lib/phpbelbios/phpbelbios.inc';
        if (!file_exists($path)) {
          $requirements['belbios_library']['title'] = t('Belbios Library');
          $requirements['belbios_library']['value'] = $path;
          $requirements['belbios_library']['severity'] = REQUIREMENT_ERROR;
          $requirements['belbios_library']['description'] = t('The Belbios.inc file is not in the place where it was expected to be.<br/>It should have been at %filepath.<br/>Please download it from !download_url, or include it in your SVN, including in SVN is explained in this !external_manual',
          array(
            '%filepath' => $path,
            '!download_url' => l(t('sourceforge'), 'http://sourceforge.net/projects/phpbelbios/'),
            '!external_manual' => l(t('SVN externals HOWTO'), 'http://webschuur.com/publications/blogs/2008-07-31-howto_include_crumo_in_devel_module_with_svn_externals')
          ));
        }
        else {
          $requirements['belbios_library']['title'] = t('Belbios Library');
          $requirements['belbios_library']['value'] = t('Library found at @filepath', array('@filepath' => $path));
        }
        return $requirements;
      }
    }

Note: code is Drupal 5

And yes, in an ideal world we would include an automatical-includer in our hook_install. But that is a lot of work. And, IMHO this hould not be handled by a CMS, but by your development framework; in this case I'd say that SVN should handle such inclusions. However, that is a new discussion. For now, I think a snippet like above will help many admins, if you add it to your module.

