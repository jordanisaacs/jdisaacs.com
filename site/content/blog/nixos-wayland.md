+++
title = "Wayland on NixOS (the hard way)"
date = 2021-11-20

[taxonomies]
series=["NixOS Desktop"]
tags=["NixOS", "Nix", "Wayland", "Linux", "Home Manager"]
+++

# Wayland the hard way

I'll preface this post by saying you can easily set the NixOS option to [enable Sway](https://search.nixos.org/options?channel=21.05&show=programs.sway.enable&from=0&size=50&sort=relevance&type=packages&query=sway) and you will have a working system. But I like to make life a little harder for myself by going deeper. I will be covering things like what is wayland, compatibility with an existing xorg config, screen locking, customization, dredded GTK, and more. I am using [dwl](https://github.com/djpohly/dwl) as my compositor but everything should be interchangeable with other `wl-roots` based compositors.

<!-- more -->

**Note 1:** This blog post heavily utilizes systemd. While I will link to sources, a general understanding will be useful. The [man page](https://man7.org/linux/man-pages/man1/systemd.1.html) is a great place to branch off of for learning.

**Note 2**: This is the second post in my NixOS desktop series. You can check out the first post on a configuration philosophy LINK HERE. And all my dotfiles are [public](https://github.com/jordanisaacs/dotfiles)! The relevant sections are [here](https://github.com/jordanisaacs/dotfiles/tree/master/modules/system/graphical) (system) and [here](https://github.com/jordanisaacs/dotfiles/tree/master/modules/users/graphical) (user).

# Start the compositor

Wayland vs. xorg

startx vs just starting a binary

Mention https://wayland.app/protocols/

My thoughts on dwl

# Dabbling with systemd

While wayland works wonders and I daily drive it, some programs just aren't ready for wayland yet. Therefore, a requirement I have is compatibility with my existing X11 configuration. Some background before the solution. Most graphical programs that utilize systemd on NixOS and home-manager default to using `graphical-session.target`. This is a [special](https://www.freedesktop.org/software/systemd/man/systemd.special.html#graphical-session.target) target that is active when a graphical session is started. However, this doesn't allow us to distinguish between an `X11` and a `Wayland` graphical session. Therefore, we need to create our own targets. The code snippets that follows are in `home-manager` syntax.

```nix
{
  systemd.user.targets.dwl-session = {
    Unit = {
      Description = "dwl compositor session";
      Documentation = [ "man:systemd.special(7)" ];
      BindsTo = [ "graphical-session.target" ];
      After = [ "graphical-session-pre.target" ];
    };
  };
}
```

The snippet above is our wayland session target. I will cover why I called it `dwl` later (see if you can understand why as you follow along!). The `BindsTo` option (see [man](https://www.freedesktop.org/software/systemd/man/systemd.unit.html#BindsTo=)) means that our `dwl-session`

Now for why its called `dwl` and not `wayland`. This form of supersetting the `graphical-session.target` can be layered. So you can have a `wayland-session` that starts general wayland programs, and then a `dwl-session` and a `river-session` that call compositor specific programs! All binding to each other.

# Copy to the Paste

lets start with the simplest thing of them all, copy and pasting. use `wl-clipboard`

# Gain a bar

setting up a bar (editing an existing home-manager module)

# Banish the black background

get a background with `swaybg`

# Securing the idle

waylock and swayidle

# The saga of GTK

the unholiness of customizing GTK on wayland

# Bonus: the keyring

This isn't wayland specific but I thought it would be a good place for setting up the gnome keyring.
