{
  # https://lukebentleyfox.net/posts/building-this-blog/
  # building zola is based on ^ blog post
  
  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
            inherit system;
            overlays = [ overlay ];
        };
        overlay = (final: prev: {
          jdisaacs-site = prev.callPackage ./site {};
        });
      in 
      rec {
        inherit (overlay);

        defaultPackage = pkgs.jdisaacs-site;

        devShell = pkgs.mkShell {
          buildInputs = [ pkgs.zola ];
        };
      }
    );
}
