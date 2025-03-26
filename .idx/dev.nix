{ pkgs, ... }: {

  channel = "stable-24.11";

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.curl
    #pkgs.cypress    
    #pkgs.docker
    #pkgs.nginx
    #pkgs.tmux
    #pkgs.libnotify
  ];

  services = {
    #nginx.enable = true;
    #docker.enable = true;
  };

}
