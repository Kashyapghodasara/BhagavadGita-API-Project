// Day 1 : 26-sep-24 (1.5hrs)
// Day 2 : 28-sep-24 (2 hrs)

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '453284a699msh9c633f8e4325c75p1753cajsn1f3e4ce797f5',
        'x-rapidapi-host': 'bhagavad-gita3.p.rapidapi.com'
    }
};

function Checking() {
    let chapter;
    let verses;
    chapter = document.getElementsByClassName("input-ch")[0].value;
    verses = document.getElementsByClassName("input-verse")[0].value;

    if(chapter > 0 && chapter <= 18 && (verses === "NO" || verses === "no")) {
        document.querySelector(".warning, .verse-warning").style.display = "none";
        Conclution();
    }
   else if(chapter > 0 && chapter <= 18 && verses > 0) {
    document.querySelector(".warning, .verse-warning").style.display = "none";
    findValues();
   }
    else {  
        document.querySelector(".warning, .verse-warning").style.display = "flex";
        /* alert("Invalid chapter or verse input."); */
    }
    
}
async function Conclution() {
    const chapter = document.getElementsByClassName("input-ch")[0].value;
    const verses = document.getElementsByClassName("input-verse")[0].value;

    try {
        // Check if chapter is between 0 and 18, and verses is "NO" or "no"
            const url = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapter}/`;
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            // Parse the JSON data
            const data = await response.json();
            console.log(data);

              for (const [key, value] of Object.entries(data)) {
                document.querySelector(".Shlok").innerHTML = "";

                if (key === "name") {
                  console.log(`key = ${key}, \nvalue = ${value}`);
                  document.querySelector(".name-of-ch").value = `${value}`;
                }
                if (key === "chapter_number") {
                    console.log(`key = ${key}, \nvalue = ${value}`);
                    // Target the span inside the button
                    document.querySelector(".ch-box span").innerText = `${value}`;
                }
                           
                if (key === "verses_count") {
                    console.log(`key = ${key}, \nvalue = ${value}`);
                    // Target the span inside the button
                    document.querySelector(".verse-box span").innerText = `${value}`;
                }
                if (key === "chapter_summary") {
                    console.log(`key = ${key}, \nvalue = ${value}`);
                    document.querySelector(".english").value = `${value}`;
                }
                if (key === "chapter_summary_hindi") {
                    console.log(`key = ${key}, \nvalue = ${value}`);
                    document.querySelector(".hindi").value = `${value}`;
                }
            }
    } 
    catch (error) {
        console.error('Error:', error);
    }
}

// Find the chapter name for particular chapter and verse search

async function chapterName() {
    const chapter = document.getElementsByClassName("input-ch")[0].value;

    try {
        // Check if chapter is between 0 and 18, and verses is "NO" or "no"
            const url = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapter}/`;
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            // Parse the JSON data
            const data = await response.json();
            console.log(data);
              for (const [key, value] of Object.entries(data)) {
                if (key === "name") {
                  console.log(`key = ${key}, \nvalue = ${value}`);
                  document.querySelector(".name-of-ch").value = `${value}`;
                }
            }
    } 
    catch (error) {
        console.error('Error:', error);  // Catch and log any errors
    }
}

async function findValues() {
    const chapter = document.getElementsByClassName("input-ch")[0].value;
    const verses = document.getElementsByClassName("input-verse")[0].value;

    try {
        // Check if chapter is between 0 and 18, and verses is Number
            const url = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapter}/verses/${verses}/`;;
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            // Parse the JSON data
            const data = await response.json();
            console.log(data);
          
              for (const [key, value] of Object.entries(data)) {
               /*  if (key === "name") {
                  console.log(`key = ${key}, \nvalue = ${value}`);
                  document.querySelector(".name-of-ch").value = `${value}`;
                } */
                  document.querySelector(".name-of-ch").value = `${chapterName()}`;

                if (key === "chapter_number") {
                    console.log(`key = ${key}, \nvalue = ${value}`);
                    document.querySelector(".ch-box span").innerText = `${value}`;
                }
                           
                if (key === "verse_number") {
                    console.log(`key = ${key}, \nvalue = ${value}`);
                    // Target the span inside the button
                    document.querySelector(".verse-box span").innerText = `${value}`;
                }
                if (key === "text") {
                    console.log(`key = ${key}, \nvalue = ${value}`);
                
                    // Split the value by "|" and join with "<br>" for line breaks
                    const formattedValue = value.split('|').map(line => line.trim()).join('<br>');
                
                    // Set the inner HTML of the element with class "Shlok"
                    document.querySelector(".Shlok").innerHTML = formattedValue;
                }
                // continue with this...
                if (key === "translations") {
                    console.log(`key = ${key}, \nvalue = ${value}`);
                    document.querySelector(".english").value= `${value[0].description}`;
                    document.querySelector(".hindi").value = `${value[5].description}`;
                }
            }
    } 
    catch (error) {
        console.error('Error:', error);  // Catch and log any errors
    }
}
document.addEventListener('keypress', function(event) {
    // Example action for Enter key (key code 13)
    if (event.key === 'Enter') {
        Checking();
    }
});
