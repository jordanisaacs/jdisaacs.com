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

See the [wiki](https://nixos.wiki/wiki/Flakes) for installation. I recommend following the system-wide installation as the `nixFlakes` installation option will not work as we need access to the `nixos-rebuild ***** --flake` command.

# Writing flake.nix

The core of the system configuration is `flake.nix`. This is the file that all our nix flake commands look for.

## Initialize flake

First create your directory that will host your configuration. I followed Wil Taylor's lead (see NixOS series) and created `.dotfiles` folder in my home directory. In your folder call `nix flake init` which will create a basic flake. You should see:

```nix
{
  description = "A very basic flake";

  outputs = { self, nixpkgs }: {

    packages.x86_64-linux.hello = nixpkgs.legacyPackages.x86_64-linux.hello;

    defaultPackage.x86_64-linux = self.packages.x86_64-linux.hello;

  };
}
```

We can update the description to signify that this is our system config `description = "System config";`.

## Setting inputs

I am a believer in [home-manager](https://github.com/nix-community/home-manager) for configuring my user environment. It allows me to have my user config follow the same philosophies of my NixOS config. Combined with its support of flakes, my entire configuration can be in a single github repository.

I also use unstable nixpkgs as the default which is a preference of mine. To reduce dependencies and pass my channel choice, I have home-manager follow my nixpkgs.

```nix
inputs = {
  nixpkgs.url = "nixpkgs/nixos-unstable";

  home-manager = {
    url = "github:nix-community/home-manager";
    inputs.nixpkgs.follows = "nixpkgs";
  };
}
```

For more information on flake inputs check out the [manual](https://nixos.org/manual/nix/unstable/command-ref/new-cli/nix3-flake.html#flake-inputs)

## Setting up outputs


:w

