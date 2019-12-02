import React from 'react';
//import logo from './logo.svg';
//import './App.css';

class Position extends React.Component{
  render(){
    return(
      <header>
        <h1><a href="/" onClick={(event)=>{
          event.preventDefault();
          this.props.onClick();
        }}>{this.props.title}</a></h1>
        {this.props.sub}
      </header>
    )
  }
}
class TOC extends React.Component{
  render(){
    return(
      <nav>
        <ol>
          {this.props.data.map(data =>
            <li data={data} key={data.id}>
              <a href={data.id+".html"} onClick={(event) => {
                event.preventDefault();
                this.props.onSelect(data.id);
              }}>
                {data.title}
              </a>
            </li>
          )}
        </ol>
      </nav>
    )
  }
}  
class Contents extends React.Component{
  render(){
    return(
      <article>
        <h2>{this.props.data.title}</h2>
        {this.props.data.desc}
        <span><img src={this.props.data.picturesUrl} alt={this.props.data.title}></img></span>
      </article>
    )
  }
}
class App extends React.Component{
  state = {
    mode :'read',
    selected_content_id:1,
    contents:[
      {id:1, title:'Seoul', desc:"Seoul officially the Seoul Special City, is the capital and largest metropolis of South Korea.", picturesUrl:'../public/seoul.jpg'},
      {id:2, title:'Busan', desc:"Busan formerly Romanized as Pusan and now officially Busan Metropolitan City, is South Korea's second most-populous city after Seoul, with a population of over 3.5 million inhabitants.", picturesUrl:'../public/busan.jpg'},
      {id:3, title:'Incheon', desc:"Incheon officially the Incheon Metropolitan City, is a city located in northwestern South Korea, bordering Seoul and Gyeonggi to the east.", picturesUrl:'../public/incheon.webp'},
      {id:4, title:'Daegu', desc:"Daegu formerly spelled Taegu and officially known as the Daegu Metropolitan City, is a city in South Korea, the fourth-largest after Seoul, Busan, and Incheon, and the third-largest metropolitan area in the nation with over 2.5 million residents.", picturesUrl:'../public/daegu.jpg'},
      {id:5, title:'Daejeon', desc:"Daejeon is South Korea's fifth-largest metropolis. Daejeon had a population of over 1.5 million in 2010.", picturesUrl:'../public/daejeon.webp'},
      {id:6, title:'Gwangju', desc:"Gwangju is the sixth-largest city in South Korea.", picturesUrl:'../public/gwangju.jpg'},
      {id:7, title:'Ulsan', desc:"Ulsan officially the Ulsan Metropolitan City, is South Korea's seventh-largest metropolitan city and the eighth-largest city overall, with a population of over 1.1 million inhabitants.", picturesUrl:'../public/ulsan.jpg'}
    ]
  }
  getSelectedContents = () => {
    let i = 0;
    while(i < this.state.contents.length){
      let data = this.state.contents[i];
      if(this.state.selected_content_id === data.id){
        return data;
      }
      i++;
    }
  }
  getContentComponent =() => {
    if(this.state.mode === 'read'){
      return <Contents data={this.getSelectedContents()}/>
    }else if(this.state.mode === 'welcome'){
      return <Contents data={{
        title:'Welcome',
        desc:'Hello,React!!!'
      }}/>
    }
  }
  render(){
    // let contents = this.getSelectedContents();
    //console.log(contents);
    return (
      <div className="App">
        <Position onClick={()=>{
          this.setState({mode:'welcome'})
        }} title="Region" sub="a page that introduces the region"/>
        <TOC onSelect={(id) => {
          this.setState({
            selected_content_id : id,
            mode : 'read'
          })
        }} data={this.state.contents}/>
        <Contents data={this.getSelectedContents()}/>
      </div>
    );
  }
}

export default App;
