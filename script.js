
//sets todays date using moment.js
let todaysDate = $("#currentDay");
todaysDate.text(moment().format("dddd, MMMM Do, YYYY"));

//create time blocks for each hour 10-6pm and style them
let timeOfDay = [10, 11, 12, 13, 14, 15, 16, 17, 18];
time();

//dynamically creates elements
function time() {
	for (let i = 0; i < timeOfDay.length; i++) {
		//row for all the content
		let row = $("<div>").addClass("row time-block");

		//hour block -- takes iteration of timeOfDay and appends it to the row
		let hour = $("<div>").addClass("hour col-1");
		hour.text(moment().set("hour", timeOfDay[i]).format("hA"));
		row.append(hour);

		//creates input area, sets the background color based on the time of day and appends it to the row
		let textArea = $("<textarea>").addClass("description col-10");
		textArea.data("data-index", timeOfDay[i] + "AM");
		if (moment().hour() === timeOfDay[i]) {
			textArea.addClass("present");
		} else if (moment().hour() < timeOfDay[i]) {
			textArea.addClass("future");
		} else if (moment().hour() > timeOfDay[i]) {
			textArea.addClass("past");
		}
		textArea.val(localStorage.getItem(timeOfDay[i] + "AM"));
		row.append(textArea);

		//creates button-adds a class from font awesome for the save icon and appends it to the row
		let button = $("<button>").addClass("saveBtn col-1 fas fa-save");
		row.append(button);

		//appends the row to the container on the HTML
		$(".container").append(row);
	}
}
//listens for click on the buttons, calls the save Input function
$(".container").on("click", "button", saveInput);

//saves the user input in local storage
function saveInput(event) {
	event.preventDefault();

	//saves the user input and sibling hour to local storage
	let savedTextArea = ($(this).siblings(".description").val());

	let savedHour = $(this.previousElementSibling).data("data-index");

	localStorage.setItem(savedHour, savedTextArea);

}