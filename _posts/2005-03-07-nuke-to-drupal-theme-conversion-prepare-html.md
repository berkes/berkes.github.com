---
layout: post
title: ! 'Nuke to Drupal Theme conversion: Prepare HTML'
created: 1110218052
tags:
- osViews *nuke2Drupal
- Drupal Talk
lang: en
---
We now need a barebones HTML file. Before starting with this , we need to knwo the areas, or regions we will use. <!--break-->

<h3>Areas Mockup</h3>
<img class="node-image" width="395" height="299" src="/files/images/Regions_cutout_small.png" title="Regions mockup" align="right" />Using <a href="http://www.inkscape.org/">inkscape</a>, I took the screenshots and drew rectangles over the areas. The colours keep it clear what areas are required. 
This mockup will later also be used to measure the exact sizes of all elements.

<h3>Sizing</h3>
<table>
  <tbody>
    <tr>
      <th>#</th>
      <th>Height</th>
      <th>Width</th>
      <th>Comment</th>
      <th>Top</th>
      <th>Left</th>
      <th>Right</th>
      <th>Bottom</th>
      <th>Margin L</th>
      <th>Margin R</th>
    </tr>
    <tr>
      <td>1</td>
      <td>80</td>
      <td>132</td>
      <td>Fixed</td>
      <td>0</td>
      <td>0</td>
      <td>x</td>
      <td>x</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <td>2</td>
      <td>80</td>
      <td>648</td>
      <td>Fixed</td>
      <td>0</td>
      <td>132</td>
      <td>x</td>
      <td>x</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <td>3</td>
      <td>80</td>
      <td>770</td>
      <td>Fluid</td>
      <td>80</td>
      <td>10</td>
      <td>0</td>
      <td>x</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <td>4</td>
      <td>x</td>
      <td>122</td>
      <td>Fixed left floating</td>
      <td>160</td>
      <td>10</td>
      <td>x</td>
      <td>x</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <td>5</td>
      <td>x</td>
      <td>x</td>
      <td>Fluid with margins</td>
      <td>160</td>
      <td>10</td>
      <td>10</td>
      <td>x</td>
      <td>122</td>
      <td>0</td>
    </tr>
    <tr>
      <td>6</td>
      <td>x</td>
      <td>122</td>
      <td>Fixed right floating</td>
      <td>160</td>
      <td>0</td>
      <td>0</td>
      <td>x</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <td>7</td>
      <td>73</td>
      <td>760</td>
      <td>Fluid</td>
      <td>x</td>
      <td>10</td>
      <td>10</td>
      <td>x</td>
      <td>0</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
