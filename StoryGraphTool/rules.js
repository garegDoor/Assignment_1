class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key];
        this.engine.show(locationData.Body);
        
        if(locationData.Choices) {
            for(let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice);
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if (choice)
        {    
            if(choice.keyRoom)
            {
                this.engine.hasKey = true;
            }

            if(choice.lightSwitches)
            {
                this.engine.atticLightsOn = true;
            }
            
            if(choice.isLocked)
            {
                if(this.engine.hasKey)
                {
                    choice.isLocked = false;
                    
                    this.engine.show("&gt: "+choice.Text);
                    this.engine.gotoScene(Location, choice.Target);
                }
                else
                {
                    this.engine.show("<br>You aproach the basement door, but when you try and open it you can't.<br>It must be locked.<br>");
                    this.engine.gotoScene(Location, "Living Room");
                }
            }
            else if(choice.isDark)
            {
                if(this.engine.atticLightsOn)
                {
                    choice.isDark = false;

                    this.engine.show("&gt: "+choice.Text);
                    this.engine.gotoScene(Location, choice.Target);
                }
                else
                {
                    this.engine.show("<br>The attic is too dark to see anything.<br>Maybe you can find a way to turn the lights on.<br>");
                    this.engine.gotoScene(Location, "Upstairs");
                }
            }
            else if(choice) {
                this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(Location, choice.Target);
            }
        } 
        else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');