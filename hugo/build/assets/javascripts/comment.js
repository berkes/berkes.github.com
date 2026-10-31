window.addEventListener('load', function(_event) {
  class Discussions {
    constructor(repo, renderer) {
      this.repo = repo;
      this.renderer = renderer;

      this.discussions = [];
      this.networks = {
        'r': 'Reddit',
        'h': 'Hacker News',
        'l': 'Lobste.rs',
      };
    }

    async maybeHandle() {
      if (!this.renderer.canRender()) {
        return;
      }

      this.renderer.showLoading();
      this.discussions = await this.repo.get(this.networks);
      this.renderer.showDiscussions(this.discussions);
    }
  }

  class discussionsRepo {
    constructor() {
      const currPath = window.location.pathname;
      // Ensure we always set the correct base, otherwise we'll be looking up
      // localhost or other test- and dev- domains.
      const documentUrl = `https://berk.es/${currPath}`;

      this.apiKey = 'D_-LzhMs4qRc2PRW9VzVdnqiIYZH1NRzoeL_kkDGWMo';
      this.fetchUrl = `https://discu.eu/api/v0/discussions/url/${encodeURIComponent(documentUrl)}`;
    }

    async get(networks) {
      const allowed_ids = Object.keys(networks);
      const response = await fetch(this.fetchUrl, {
        credentials: 'omit',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      if (response.ok) {
        const json = await response.json();
        return json.map((discussion) => allowed_ids.includes(discussion.platform) ? { ...discussion, title: networks[discussion.platform] } : null)
          .filter((discussion) => discussion !== null);
      } else {
        return [];
      }
    }
  }

  class templateRenderer {
    constructor() {
      this.commentTemplate = document.getElementById('comment-line').content;
      this.loadingTemplate = document.getElementById('comment-loading').content;
      this.emptyTemplate = document.getElementById('comment-empty').content;
      this.errorTemplate = document.getElementById('comment-error').content;
      this.commentNode = document.getElementById('comment');
    }

    showLoading() {
      this.commentNode.appendChild(this.loadingTemplate.cloneNode(true));
    }

    showDiscussions(discussions) {
      this.commentNode.querySelector('.loading').remove();

      if (discussions.length === 0) {
        this.commentNode.appendChild(this.emptyTemplate.cloneNode(true));
      } else {
        discussions.map((discussion) => {
          let commentTemplate = this.commentTemplate.cloneNode(true);
          commentTemplate.querySelector('a').href = discussion.discussion_url;
          let title = discussion.subreddit ? `${discussion.title} r/${discussion.subreddit}` : discussion.title;
          commentTemplate.querySelector('.platform').innerText = title;
          commentTemplate.querySelector('.count').innerText = discussion.comment_count;
          this.commentNode.querySelector('ul').appendChild(commentTemplate);
        });
      }
    }

    canRender() {
      return this.commentNode !== null;
    }
  };

  let repo = new discussionsRepo();
  let renderer = new templateRenderer();
  new Discussions(repo, renderer).maybeHandle();
}); 
