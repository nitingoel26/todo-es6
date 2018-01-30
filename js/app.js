class Time {
	constructor(){
		const date = new Date()
		this.seconds = date.getSeconds()
		this.minutes = date.getMinutes()
		this.hours = date.getHours()
		this.$timeWrapper = document.querySelector('.time')
		this.updateDom()
		setInterval(()=>{
			this.updateSeconds()
		},1000)
	}

	updateSeconds() {
		this.seconds++
		if(this.seconds >= 60) {
			this.seconds = 0
			this.updateMinutes()
		}
	}

	updateMinutes() {
		this.minutes++
		if(this.minutes >= 60) {
			this.minutes = 0
			this.updateHours()
		}
		this.updateDom()
	}

	updateHours() {
		this.hours++
		if(this.hours >= 24) {
			this.hours = 0
		}
	}

	updateDom() {
		this.$timeWrapper.innerHTML = `${this.hours}:${this.minutes}`
	}

}

class Todo {
	constructor(title,id){
		this.title = title
		this.completed = false
		this.id = id
		this.$li = document.createElement('li')
		this.$li.setAttribute('class', 'todo-item')
		this.$li.innerHTML = `
<div>
    <div class="todo-title">
      ${this.title}
    </div>
    <div class="todo-button pull-right hover-light">
    <i class="fa fa-trash-o"> </i>

    </div>
    <div class="todo-button pull-right hover-light">
    <i class="fa fa-check"> </i>
</div>
         `

      	this.$updateButton = this.$li.querySelector('.fa-check')
      	this.$deleteButton = this.$li.querySelector('.fa-trash-o')
      	this.$updateButton.onclick = (evt) => {
      		this.updateStatus()
      	}
	}

	updateStatus(){
		if(this.completed){
			this.redo()
		}
		else{
			this.done()
		}
		this.completed = !this.completed
	}

	done(){
		this.$li.querySelector('.todo-title').setAttribute('class','todo-title done')
		this.$updateButton.setAttribute('class','fa fa-undo')
	}

	redo(){

	}


}

class TodoList {
	constructor(){
		this.$list = document.querySelector('.todo-list')
		this.$input = document.querySelector('.todo')
		this.list = []
		this.index = 0

		this.$input.onkeyup = (evt) => {
			if(evt.key === "Enter"){
				this.addTodo()
			}
		}
	}

	addTodo() {
		const title = this.$input.value
		this.$input.value = ""
		const todo = new Todo(title, this.index++)
		this.list = [...this.list, todo]
		this.$list.appendChild(todo.$li)
	}
}


new Time()
new TodoList()
