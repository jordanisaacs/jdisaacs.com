+++
title = "NixOS Configuration with Flakes"
date = 2021-09-06

[taxonomies]
series=["NixOS Desktop"]
tags=["NixOS", "Nix", "X11", "Linux"]
+++

# My Flakes Philosophy

In this blog post I will overview how to setup flakes with NixOS and home-manager and my approach to configuring. While flakes are *technically* unstable I have only ever used NixOS with flakes and have not had any issues with them. NixOS and home-manager have a wealth of options but most of them can be grouped together into sensible categories such as *sound*, *display*, etc. Therefore I leverage the [Nix module system](https://nixos.wiki/wiki/Module) to create a high level set of options that makes setting up new systems and profiles easier.

<!-- more -->

I have to thank Wil Taylor for his amazing NixOS series (see below) and his [dotfiles](https://github.com/wiltaylor/dotfiles) repository for providing a baseline/inspiration. My configuration started off as a copy of his and has since evolved but much remains similar. He uses a *role* system which lets you choose what configuration files to import while I prefer to use the module system which provides more flexibility. This flexibility will show its strength in a future post where I show setting up NixOS without a display manager.

# Setting up NixOS

There has been much written on setting up NixOS so if you don't have it installed check out these resources:

* [Graham Christensen Dell Setup](https://grahamc.com/blog/nixos-on-dell-9560)
    * Setting up partitions and encryption (luks)
* [Wil Taylor's NixOS series](https://www.youtube.com/watch?v=QKoQ1gKJY5A&list=PL-saUBvIJzOkjAw_vOac75v-x6EzNzZq-)
    * Overview of how to install NixOS and basic flake introduction. Also overviews how to set up an initial NixOS flake configuration. I used the series to get started with NixOS/Flakes and highly recommend watching the full series.

# Introduction to Flakes

As with NixOS setup there are some good writeups on how flakes work. My go-to when I need to brush up is [Practical Nix Flakes](https://serokell.io/blog/practical-nix-flakes). Also Wil Taylor's series provides a nice overview as well.

