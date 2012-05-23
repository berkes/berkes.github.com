---
layout: post_archive
title: Localization server local pakage generator from SVN (hacked up script)
created: 1234778161
tags:
- Project Management
- Tips and tricks
- Drupal Talk
- Drupal
lang: en
---
Unless I missed a feature entirely, <a href="http://drupal.org/project/l10n_server">Drupal Localization Server</a> does not really allow packages from external sources to be parsed in its "local package connector". It only eats tarballs with the exact names as they are released from Drupal.org. For example _tagadelic-5.x-1.2.tar.gz_ and nothing else. Well, off course the 5.x-1.2 can vary. 

I therefore hacked up an ugly script that we run in a cron to grab our REL-5.x-1.1 from our SVN. Our subversion repository-layout is rather hardcoded in the script, but since it is not that exotic, it should be easy to change it. This script runs over a loca working copy of our SVN and grabs the tags (aka SVN releases) and then tarballs them with the filenames that the local package connector will recognise. 
<!--break-->
    <?php
    
    ini_set('display_errors', 'stdout');
    error_reporting(E_ALL);
    init();
    
    //Settings
    function l10n_releaser_settings($setting = '') {
      $settings = array(
        'svn_working_copy' => '/e/ap/tools.ncrv.nl/data/l10n/vibe-repos/', //include trailing slash.
        'tarballs_location' => '/e/ap/tools.ncrv.nl/data/l10n/', //include trailing slash.
      );
      
      if (isset($settings[$setting])) {
        return $settings[$setting];
      }
      else {
        return $settings;
      }
    }
    
    //svn up working copy
    function l10n_releaser_update_working_copy() {
      exec('svn update '. escapeshellarg(l10n_releaser_settings('svn_working_copy')), $output);
      return $output;
    }
    
    //loop trough all tags
    function l10n_releaser_find_tags() {
      $tags = array();
      $svn_working_copy = l10n_releaser_settings('svn_working_copy');
      $pattern = $svn_working_copy . '*/tags/*';
      foreach (glob($pattern, GLOB_ONLYDIR) as $release) {
        $preg_pattern = "@($svn_working_copy)([^/]*)/tags/REL-(.*)@";
        preg_match($preg_pattern, $release, $matches);
        if (count($matches) >= 3) {
          $tag->module = $matches[2];
          $tag->release_tag = $matches[3];
          $tag->from_dir = $matches[0];
          $tag->tarball_fragment = $matches[2] .'-'. $matches[3];
          
          $tags[] = $tag;
        }
      }
      return $tags;
    }
    
    //see if the tarball for that tag already exists
    function l10n_releaser_tarball_released($tarball_fragment) {
      $path = l10n_releaser_settings('tarballs_location');
    
      if (file_exists($path . $tarball_fragment .'.tar.gz')) {
        return TRUE;
      }
      else {
        return FALSE;
      }
    }
    
    //if no, create it
    function l10n_releaser_create_tarball($tarball_fragment, $from_dir, $simulate = FALSE) {
      $dir = l10n_releaser_settings('tarballs_location');
      
      $command = 'tar -czf '. $dir . $tarball_fragment .'.tar.gz '. escapeshellarg($from_dir);
    
      if ($simulate) {
        print "\n\t$command\n";
      }
      else {
        print "creating tarball $tarball_fragment\n";
        exec($command, $output);
      }
      return $output;
    }
    
    //Do it!
    function init() {
      l10n_releaser_update_working_copy();
      foreach (l10n_releaser_find_tags() as $release) {
        if (!l10n_releaser_tarball_released($release->tarball_fragment)) {
          print l10n_releaser_create_tarball($release->tarball_fragment, $release->from_dir);
        }
      }
    }
    ?>
