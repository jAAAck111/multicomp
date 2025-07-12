function changeCompSettings(thisObj) {
    try {
        var proj = app.project;

        if (!proj) {
            alert("No project is open.");
            return;
        }

        // ui below
        var compPanel = new Window("dialog", "Change Composition Settings", undefined, { resizeable: false });

        if (!compPanel) {
            alert("Error: Unable to create UI panel.");
            return;
        }

        compPanel.orientation = "column";
        compPanel.alignChildren = "fill";

        compPanel.add("statictext", undefined, "Enter the new settings for the compositions:");

        // input fields x,y,fps,secs
        var inputGroup = compPanel.add("group");
        inputGroup.orientation = "column";
        inputGroup.alignment = "center"; // horizontal centre

        // x axis
        inputGroup.add("statictext", undefined, "Width:");
        var widthInput = inputGroup.add("edittext", undefined, "2160"); // change "2160" to edit default value
        widthInput.characters = 10; 

        // y axis
        inputGroup.add("statictext", undefined, "Height:");
        var heightInput = inputGroup.add("edittext", undefined, "2160"); // as above but for y 
        heightInput.characters = 10; 

        // fps
        inputGroup.add("statictext", undefined, "Frame Rate:");
        var frameRateInput = inputGroup.add("edittext", undefined, "20.00"); // change "20.00" to edit default
        frameRateInput.characters = 10; 

        // secs
        inputGroup.add("statictext", undefined, "Duration (seconds):");
        var durationInput = inputGroup.add("edittext", undefined, "10.00"); // change "10" to edit default
        durationInput.characters = 10; // set

        // tick for all comps
        var applyToAllCheckbox = compPanel.add("checkbox", undefined, "Apply to all compositions in the project");

        var okButton = compPanel.add("button", undefined, "OK");

        okButton.onClick = function () {
            try {
                var newWidth = parseInt(widthInput.text, 10);
                var newHeight = parseInt(heightInput.text, 10);
                var newFrameRate = parseFloat(frameRateInput.text);
                var newDuration = parseFloat(durationInput.text);

                // validate
                if (isNaN(newWidth) || isNaN(newHeight) || isNaN(newFrameRate) || isNaN(newDuration)) {
                    alert("Please enter valid numeric values for all settings.");
                    return;
                }

                var compsToChange = [];

                if (applyToAllCheckbox.value) {
                    for (var i = 1; i <= proj.numItems; i++) {

