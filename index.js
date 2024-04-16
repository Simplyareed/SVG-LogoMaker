const fs = require('fs');
const inquirer = require("inquirer");
const shapes = require('./lib/shapes');   // Import custom shapes module





// Function to display prompts and gather user inputs

function promptUser(){
    return inquirer.prompt([
    {
        type: "input",
        name: "text",
        message: "TEXT: Enter up to (3) Characters:",
        validate: async(input) => {
            return input.length <= 3   // Validates input to be 3 characters 
        }
    },
    {
        type: "input",
        name: "textColor",
        message: "TEXT COLOR: Enter a color keyword (OR a hexadecimal number):",
    },
    {
        type: "input",
        name: "color",
        message: "SHAPE COLOR: Enter a color keyword (OR a hexadecimal number):",
    },
    {
        type: "list",
        name: "shape",
        message: "Choose which Image you would like?",
        choices: ["Circle", "Square", "Triangle"],
    }
]);
}

// Function to execute the prompt and return user responses
const questions = async () => {
    const answers = await promptUser();
    return answers;
};

// Function to write SVG content to a file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Congratulations, you have Generated a logo.svg!");
    });
}

async function init() {
    try {
        // Prompt user for input
        const answers = await questions();
        var shape = undefined;
        if(answers.shape ==="Circle"){
            shape = new shapes.Circle();

        }
        else if (answers.shape ==="Square"){
            shape = new shapes.Square();

        }
        else if (answers.shape ==="Triangle"){
            shape = new shapes.Triangle();

        }
        else {
            console.log('Invalid shape')
            return
        }

        shape.setColor(answers.color);
        // Create SVG content string with user-defined text and colors
      var svg = `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style="width:300px; height:200px">
      ${shape.render()}
      <text font-size="64px" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>
      </svg>
      `

      
    
         writeToFile("logo.svg", svg);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}


// Function call to initialize app
init();
