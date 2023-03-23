function getSiteBaseAddress(){

    var baseSiteAddress = (document.location.host === "valerasnarbutas.github.io") ?
        document.location.origin + "/posts" : document.location.origin;
        // baseSiteAddress: https://valerasnarbutas.github.io/posts
        // document.location.origin: https://valerasnarbutas.github.io
        // document.location.host: valerasnarbutas.github.io
    // return baseSiteAddress;
    return document.location.origin;
}

$(function (){
    console.log("main.js loaded");
    getSiteBaseAddress();
    //if tabs, if tabs contain m365 load JSON file, if tabs contain -PnP load file
    if($("a[data-tab='cli-m365-ps']") || $("a[data-tab='m365cli-bash']")){

        var jsonHelpPath = getSiteBaseAddress() +"/assets/help/cli.help.json";

        // Load inline help
        $.getJSON(jsonHelpPath, function (data) {

            $.each(data, function (_u, helpItem) {

                //Working
                var cmdlet = helpItem.cmd;
                var cmdHelpUrl = helpItem.helpUrl;
                var tabs = ["cli-m365-ps","m365cli-bash","cli-m365-bash"]; //TODO: this needs fixing

                updateCmdletWithHelpLinks(tabs, cmdlet, cmdHelpUrl);
            });
        });
    }

    if($("a[data-tab='pnpps']")){
        var jsonHelpPath = getSiteBaseAddress() +"/assets/help/powershell.help.json";
        $.getJSON(jsonHelpPath, function (data) {
            $.each(data, function (_u, helpItem) {
                var cmdlet = helpItem.cmd;
                var cmdHelpUrl = helpItem.helpUrl;
                var tabs = ["pnpps"]; //TODO: this needs fixing

                updateCmdletWithHelpLinksPs(tabs, cmdlet, cmdHelpUrl);
            });
        });
    }

    if($("a[data-tab='spoms-ps']")){
        var jsonHelpPath = getSiteBaseAddress() +"/assets/help/spoms.help.json";
        $.getJSON(jsonHelpPath, function (data) {
            $.each(data, function (_u, helpItem) {
                var cmdlet = helpItem.cmd;
                var cmdHelpUrl = helpItem.helpUrl;
                var tabs = ["spoms-ps"]; //TODO: this needs fixing

                updateCmdletWithHelpLinksPs(tabs, cmdlet, cmdHelpUrl);
            });
        });
    }

    function updateCmdletWithHelpLinksPs(tabs, cmdlet, cmdHelpUrl) {

        $.each(tabs, function (_i, tab) {
            $("section[data-tab='" + tab + "'] pre code").contents().each(function (index, line) {
                var objLine = $(line);

                if (objLine.text().indexOf(cmdlet) > -1) {
                    var parts = objLine.text().split(" ");
                    var updateLine = false;
                    $.each(parts, function (_j, part) {

                        var partClean = part.replace("\n", "").replace("\n\n","");

                        //if (part === cmdlet || part === "\n" + cmdlet || part === "\n\n" + cmdlet || part ===  cmdlet + "\n" || part === "\n\n" + cmdlet) {
                        if (partClean === cmdlet) {
                            parts[_j] = part.replace(partClean, "<a href='" + cmdHelpUrl + "' class='cmd-help' target='_blank'>" + part +"</a>");
                            updateLine = true;
                        }
                    });

                    //objLine.replaceWith(parts[0] + "<a href='" + cmdHelpUrl + "' class='cmd-help' target='_blank'>" + cmdlet + "</a>" + parts[1]);
                    if(updateLine){
                        objLine.replaceWith(parts.join(" "));
                    }

                }
            });
        });
    }

    function updateCmdletWithHelpLinks(tabs, cmdlet, cmdHelpUrl) {

        $.each(tabs, function (_i, tab) {
            $("section[data-tab='" + tab + "'] pre code").contents().each(function (index, line) {
                var objLine = $(line);

                if (objLine.text().indexOf(cmdlet) > -1) {
                    var parts = objLine.text().split(cmdlet);
                    objLine.replaceWith(parts[0] + "<a href='" + cmdHelpUrl + "' class='cmd-help' target='_blank'>" + cmdlet + "</a>" + parts[1]);
                }
            });
        });
    }
});
