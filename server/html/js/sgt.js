


class SGT_template{
	/* constructor - sets up sgt object 
	params: (object) elementConfig - all pre-made dom elements used by the app
	purpose: 
		- Instantiates a model and stores pre-made dom elements it this object
		- Additionally, will generate an object to store created students 
		who exists in our content management system (CMS)
	return: undefined
	ESTIMATED TIME: 1 hour
	*/
	constructor(obj){
		this.model = obj;
		this.handleAdd = this.handleAdd.bind(this)
		this.handleCancel = this.handleCancel.bind(this)
		this.data = {};
		this.deleteStudent=this.deleteStudent.bind(this);
		this.getDataFromServer = this.getDataFromServer.bind(this);
		this.handleData = this.handleData.bind(this);
		this.sendDataToServer = this.sendDataToServer.bind(this)
		this.deleteData = this.deleteData.bind(this)
		this.id=null;
	}
	/* addEventHandlers - add event handlers to premade dom elements
	adds click handlers to add and cancel buttons using the dom elements passed into constructor
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/

	addEventHandlers(){
		$('.add').on('click',this.handleAdd);
		$('.cancel').on('click',this.handleCancel);
		$('.data').on('click',this.getDataFromServer);
	}
	/* clearInputs - take the three inputs stored in our constructor and clear their values
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/
	clearInputs(){
		this.model.nameInput.val('');
		this.model.courseInput.val('');
		this.model.gradeInput.val('');
	}
	/* handleCancel - function to handle the cancel button press
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/
	handleCancel(){
		this.clearInputs();
	}
	/* handleAdd - function to handle the add button click
	purpose: grabs values from inputs, utilizes the model's add method to save them, then clears the inputs and displays all students
	params: none
	return: undefined
	ESTIMATED TIME: 1 hour
	*/
	handleAdd(){
		var name = this.model.nameInput.val();
		var course = this.model.courseInput.val();
		var grade = this.model.gradeInput.val();
		this.sendDataToServer(name,course,grade);
		this.clearInputs();
		this.displayAllStudents();
	}
	getDataFromServer(response){
		// if (response.success === false){
		// 	console.log('errors '+response.errors)
		// }
		var ajaxOptions = {
			dataType:'json',
			url:"http://s-apis.learningfuze.com/sgt/get",
			method:'post',
			data: {
				api_key:"ytxb41Nxmb"
			},
			success:this.handleData
		}
		$.ajax(ajaxOptions);
	}
	handleData(response){
		if (response.hint){
			console.log(response);
		}
		if (response.success === true){
			for (var eachStudent in response.data){
				this.createStudent(response.data[eachStudent].name,
				response.data[eachStudent].course,
				response.data[eachStudent].grade,
				response.data[eachStudent].id
				)
			}
		} else {
			return false;
		}
		this.displayAllStudents();
	}
	/* displayAllStudents - iterate through all students in the model
	purpose: 
		grab all students from model, 
		iterate through the retrieved list, 
		then render every student's dom element
		then append every student to the dom's display area
		then display the grade average
	params: none
	return: undefined
	ESTIMATED TIME: 1.5 hours
	*/
	displayAllStudents(){
		this.model.displayArea.empty();
		for(var key in this.data){
			var student = this.data[key].render()
			this.model.displayArea.append(student);
		}
		this.displayAverage()
	}
	/* displayAverage - get the grade average and display it
	purpose: grab the average grade from the model, and show it on the dom
	params: none
	return: undefined 
	ESTIMATED TIME: 15 minutes

	*/

	displayAverage(){
		var total=0;
		var studentCount = 0;
		for (var key in this.data){
			total+=this.data[key].data.grade
			studentCount++
		}
		this.model.averageArea.text((total/studentCount).toFixed(2));
	}
	/* createStudent - take in data for a student, make a new Student object, and add it to this.data object

		name : the student's name
		course : the student's course
		grade: the student's grade
		id: the id of the student
	purpose: 
			If no id is present, it must pick the next available id that can be used
			when it creates the Student object, it must pass the id, name, course, grade, 
			and a reference to SGT's deleteStudent method
	params: 
		name : the student's name
		course : the student's course
		grade: the student's grade
		id: the id of the student
	return: false if unsuccessful in adding student, true if successful
	ESTIMATED TIME: 1.5 hours
	*/
	createStudent(name,course,grade,id){
		if(this.doesStudentExist(id) || isNaN(grade)){
			return false;
		// } else if (!id && name && !isNaN(grade) && course){
		// 	for (var key in this.data){
		// 		var last = parseInt(key)
		// 		last+=1
		// 	}
		// 	if (!last){
		// 		last = '1';
		// 	}
		// 	var newStudent = new Student(last,name,course,grade,this.deleteStudent)
		// 	this.data[last] = newStudent;
		// 	return true;
		}else if (name&&course&&!isNaN(grade)&&!isNaN(id)){
			var newStudent = new Student(id,name,course,grade,this.deleteStudent)
			this.data[id] = newStudent;
			return true;
		}
	}
	sendDataToServer(name,course,grade){
		var ajaxOptions={
			dataType:'json',
			url:"http://s-apis.learningfuze.com/sgt/create",
			method:'post',
			data: {
				api_key:"ytxb41Nxmb",
				name:name,
				course:course,
				grade:grade,
			},
			success: this.getDataFromServer
		}
		$.ajax(ajaxOptions);
	}
	deleteData(id){
		var ajaxOptions={
			dataType:'json',
			url:"http://s-apis.learningfuze.com/sgt/delete",
			method:'post',
			data: {
				api_key:"ytxb41Nxmb",
				student_id:id
			},
			success: this.didDataDelete
		}
		$.ajax(ajaxOptions);
	}
	didDataDelete(){
		console.log('success, data was deleted');
	}
	/* doesStudentExist - 
		determines if a student exists by ID.  returns true if yes, false if no
	purpose: 
			check if passed in ID is a value, if it exists in this.data, and return the presence of the student
	params: 
		id: (number) the id of the student to search for
	return: false if id is undefined or that student doesn't exist, true if the student does exist
	ESTIMATED TIME: 15 minutes
	*/
	doesStudentExist(id){
		if (this.data[id]){
			return true;
		} else {
			return false;
		}
	}
	/* readStudent - 
		get the data for one or all students
	purpose: 
			determines if ID is given or not
			if ID is given, return the student by that ID, if present
			if ID is not given, return all students in an array
	params: 
		id: (number)(optional) the id of the student to search for, if any
	return: 
		a singular Student object if an ID was given, an array of Student objects if no ID was given
		ESTIMATED TIME: 45 minutes
	*/
	readStudent(id){
		var infoArray=[];
		if (id && this.doesStudentExist(id)){
			return this.data[id]
		}else if (!id){
			for (var key in this.data){
				infoArray.push(this.data[key]);
			}
			return infoArray;
		} else {
			return false;
		}
	}
	/* updateStudent - 
		not used for now.  Will be used later
		pass in an ID, a field to change, and a value to change the field to
	purpose: 
		finds the necessary student by the given id
		finds the given field in the student (name, course, grade)
		changes the value of the student to the given value
		for example updateStudent(2, 'name','joe') would change the name of student 2 to "joe"
	params: 
		id: (number) the id of the student to change in this.data
		field: (string) the field to change in the student
		value: (multi) the value to change the field to
	return: 
		true if it updated, false if it did not
		ESTIMATED TIME: no needed for first versions: 30 minutes
	*/
	updateStudent(id,field,changedValue){
		if (this.doesStudentExist(id)){
			this.data[id].updateStudent(field,changedValue)
			return true;
		} else {
			return false;
		}
	}
	/* deleteStudent - 
		delete the given student at the given id
	purpose: 
			determine if the ID exists in this.data
			remove it from the object
			return true if successful, false if not
			this is often called by the student's delete button through the Student handleDelete
	params: 
		id: (number) the id of the student to delete
	return: 
		true if it was successful, false if not
		ESTIMATED TIME: 30 minutes
	*/
	deleteStudent(id){
		console.log(this.data);
		if (this.doesStudentExist(id)){
			delete this.data[`${id}`];
			this.deleteData(id);
			return true;
		} else{
			return false;
		}
	}
}
