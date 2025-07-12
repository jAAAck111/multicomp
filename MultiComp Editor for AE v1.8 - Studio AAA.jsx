function changeCompSettings(thisObj) {
    try {
        var proj = app.project;
 
        if (!proj) {
            alert("No project is open.");
            return;
        }
 
        // ui panel
        var compPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Change Composition Settings", undefined, {resizeable: true});
        if (!compPanel) {
            alert("Error: Unable to create UI panel.");
            return;
        }
 
        compPanel.orientation = "column";
        compPanel.alignChildren = "fill";
 
        // creating ui panel for comp settings
        compPanel.add("statictext", undefined, "Enter the new settings for the compositions:");
 
        var widthGroup = compPanel.add("group");
        widthGroup.add("statictext", undefined, "Width:");
        var widthInput = widthGroup.add("edittext", undefined, "2160"); // change "2160" to edit default y axis value
        widthInput.characters = 10;
 
        var heightGroup = compPanel.add("group");
        heightGroup.add("statictext", undefined, "Height:");
        var heightInput = heightGroup.add("edittext", undefined, "2160"); // as above but for x axis
        heightInput.characters = 10;
 
        var frameRateGroup = compPanel.add("group");
        frameRateGroup.add("statictext", undefined, "Frame Rate:");
        var frameRateInput = frameRateGroup.add("edittext", undefined, "20.00"); // edit "20.00" to change default fps value
        frameRateInput.characters = 10;
 
        var durationGroup = compPanel.add("group");
        durationGroup.add("statictext", undefined, "Duration (seconds):");
        var durationInput = durationGroup.add("edittext", undefined, "10.00"); // edit "10.00" to change default secs
        durationInput.characters = 10;
 
        var applyToAllGroup = compPanel.add("group");
        var applyToAllCheckbox = applyToAllGroup.add("checkbox", undefined, "Apply to all compositions in the project");
 
        var buttonGroup = compPanel.add("group");
        buttonGroup.orientation = "row";
        buttonGroup.alignment = "center";
        var okButton = buttonGroup.add("button", undefined, "OK");
 
        // event handler for OK button ui and alert msg for wrong inputs
        okButton.onClick = function() {
            try {
                alert("Applying composition changes"); // alex's code checks if ok triggered
                var newWidth = parseInt(widthInput.text, 10);
                var newHeight = parseInt(heightInput.text, 10);
                var newFrameRate = parseFloat(frameRateInput.text);
                var newDuration = parseFloat(durationInput.text);
 
                if (isNaN(newWidth) || isNaN(newHeight) || isNaN(newFrameRate) || isNaN(newDuration)) {
                    alert("Please enter valid numeric values for all settings.");
                    return;
                }
 
                var compsToChange = [];
                if (applyToAllCheckbox.value) {
                    for (var i = 1; i <= proj.numItems; i++) {
                        if (proj.item(i) instanceof CompItem) {
                            compsToChange.push(proj.item(i));
                        }
                    }
                } else {
                    for (var i = 0; i < proj.selection.length; i++) {
                        if (proj.selection[i] instanceof CompItem) {
                            compsToChange.push(proj.selection[i]);
                        }
                    }
                }
 
                if (compsToChange.length === 0) {
                    alert("No compositions found to change.");
                    return;
                }
 
                app.beginUndoGroup("Change Multiple Comp Settings");
 
                for (var i = 0; i < compsToChange.length; i++) {
                    var comp = compsToChange[i];
                    comp.width = newWidth;
                    comp.height = newHeight;
                    comp.frameRate = newFrameRate;
                    comp.duration = newDuration;
                }
 
                app.endUndoGroup();
 
                alert("Composition settings updated successfully!");
            } catch (e) {
                alert("An error occurred while updating compositions: " + e.toString());
            }
        };
 
        // adds studio aaa branding and support message with email etc
        var supportMessage1 = compPanel.add("statictext", undefined, "For support and tutorial, go to:"); // edit quoted text to say whatever you want
        var supportMessage2 = compPanel.add("statictext", undefined, "studioaaa.com/multicomp"); // as above
        supportMessage1.justify = "center";
        supportMessage2.justify = "center";
 
        compPanel.layout.layout(true);
        compPanel.layout.resize();
        compPanel.onResizing = compPanel.onResize = function() { compPanel.layout.resize(); };
 
        if (compPanel instanceof Window) {
            compPanel.center();
            compPanel.show();
        }
    } catch (e) {
        alert("An error occurred: " + e.toString());
    }
}
 
changeCompSettings(this);

