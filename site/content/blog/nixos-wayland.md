+++
title = "Wayland on NixOS (the hard way)"
date = 2021-11-20

[taxonomies]
series=["NixOS Desktop"]
tags=["NixOS", "Nix", "Wayland", "Linux", "Home Manager"]
+++

# Wayland the hard way

I'll preface this post by saying you can easily set the NixOS option to [enable Sway](https://search.nixos.org/options?channel=21.05&show=programs.sway.enable&from=0&size=50&sort=relevance&type=packages&query=sway) and you will have a working system. But I like to make life a little harder for myself by going deeper. I will be covering things like compatibility with an existing X11 config, cursors, screen locking, backgrounds, and more. I am using [dwl](https://github.com/djpohly/dwl) as my compositor but everything should be interchangeable with other `wl-roots` based compositors.

<!-- more -->

**Note:** This blog post heavily utilizes systemd. While I will link to sources, a general understanding will be useful. The [man page](https://man7.org/linux/man-pages/man1/systemd.1.html) is a great place to branch off of for learning.

# Setting up the compositor

While wayland is works wonders and I daily drive it, some programs just aren't ready for wayland yet. Therefore, a requirement I have is compatibility with my existing X11 configuration. Some background before the solution. Most graphical programs that utilize systemd on NixOS and home-manager default to using `graphical-session.target`. This presents an issue as some programs should only be 


