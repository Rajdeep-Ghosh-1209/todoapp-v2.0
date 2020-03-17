import React , { Component } from 'react';
//import { render } from 'react-dom';
import "./App.css";


class App extends Component {
  constructor(props){
    super(props);

    this.state={
      newItem:"",
      list:[],
      term:""
    }

    this.searchHandler = this.searchHandler.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
  }

  searchHandler(event){
    this.setState({term: event.target.value})
  }

  componentDidMount(){
    this.hydrateStateWithLocalStorage();

    //event listener to save state to localStorage when user leaves/refreshes the page

    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount(){
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    //saves if the component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage(){

    for(let key in this.state){

      if(localStorage.hasOwnProperty(key)){
        
        let value =localStorage.getItem(key);

        try
        {
            value = JSON.parse(value);
            this.setState({ [key]: value });
        } 
        catch (e) 
        {
            this.setState({ [key]: value});   
        }
      }
    }
  }
  
  saveStateToLocalStorage(){
      for(let key in this.state){
          localStorage.setItem(key, JSON.stringify(this.state[key]));
      }
  }

  updateInput(key, value){
    //update react state
    this.setState({
      [key]: value
    })
  }

  keyPressed(event){
      if(event.key==="Enter"){
        this.addItem(); 
      }

  }

  addItem(){
    //create item with unique id
    const newItem={
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };

    //copying current list
    const list = [...this.state.list];

    //add new item to list
    list.push(newItem);

    //update the set state to go blank after input 
    this.setState({
      list,
      newItem:""
    });

  }

  deleteItem(id){
    //copy current list
    const list = [...this.state.list];

    //filter out the item deleted
    const updateList = list.filter(item => item.id !== id);

    this.setState({list: updateList});
  }

  render() {
    return (
      <div className="app">
        <nav>
        t o D o - L i s t
        </nav>
       <div className="container">
        <div>
           Add an Item..
           <br/>
           <input
              type="text"
              placeholder="Type here.."
              className="txt-box"
             value= {this.state.newItem}
              onChange={e => this.updateInput("newItem", e.target.value)}
              onKeyPress={e => this.keyPressed(e)}                   
            />  
            <button
              className="add-btn" 
              
              onClick={ () => this.addItem() }
            >
             <b>+</b> 
            </button>
            <br/>
            
              {this.state.list.map(item => {
                    return(
                        <ul>
                            <li key={item.id}>
                              {item.value}   
                              <button
                              className="del-btn"
                              onClick={ () => this.deleteItem(item.id)}
                              >
                              <b>X</b>
                              </button>    
                            </li>
                          </ul>
                          )
            })}
                
          </div>
     </div>
     </div>
    );
  }
  
}

export default App;
