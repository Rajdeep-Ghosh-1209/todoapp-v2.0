import React , { Component } from 'react';
//import { render } from 'react-dom';
import "./App.css";


class App extends Component {
  constructor(props){
    super(props);

    this.state={
      newItem:"",
      list:[]
    }
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
              className="txt-box"
              placeholder="Type here.."
             value= {this.state.newItem}
              onChange={e => this.updateInput("newItem", e.target.value)}
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
                   <li key={item.id}>
                    {item.value}
                    <button
                      className="del-btn"
                      onClick={ () => this.deleteItem(item.id)}
                    >
                      <b>X</b>
                    </button>    
                  </li>
                )
              })}
            

          </div>
     </div>
     </div>
    );
  }
  
}

export default App;
