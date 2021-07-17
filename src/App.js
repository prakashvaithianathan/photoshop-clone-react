import React,{useState} from 'react'
import './App.css'
import Sidebar from './components/sidebar/Sidebar.js'
import Slider from './components/slider/Slider.js'
import * as htmlToImage from 'html-to-image'
import * as download from 'downloadjs'

const items = [
    {
        name:"Brightness",
        property:"brightness",
        value:100,
        range:{
            min:0,
            max:200
        },
        unit:"%"
    },
    {
        name:"Contrast",
        property:"contrast",
        value:100,
        range:{
            min:0,
            max:200
        },
        unit:"%"
    },
    {
        name:"Saturation",
        property:"saturate",
        value:100,
        range:{
            min:0,
            max:200
        },
        unit:"%"
    },
    {
        name:"Hue-Rotate",
        property:"hue-rotate",
        value:0,
        range:{
            min:0,
            max:360
        },
        unit:"deg"
    },
    {
        name:"Sepia",
        property:"sepia",
        value:0,
        range:{
            min:0,
            max:100
        },
        unit:"%"
    },
    {
        name:"GrayScale",
        property:"grayscale",
        value:0,
        range:{
            min:0,
            max:100
        },
        unit:"%"
    },
    {
        name:"Blur",
        property:"blur",
        value:0,
        range:{
            min:0,
            max:20
        },
        unit:"px"
    },
]

const App = () => {
     const [image,setImage] = useState(null)
    const [options,setOptions] = useState(items)
    const [selectedIndex,setSelectedIndex] = useState(0)
  const selectedOptions = options[selectedIndex];

    const handleChange = (e)=>{
      const objectURL = URL.createObjectURL(e.target.files[0]);
      setImage(objectURL)
    }

    const applyFilters = ()=>{
        const filters = options.map((option)=>{
          
            return `${option.property}(${option.value}${option.unit})`
        })
       
        return{
            filter:filters.join(" "),
            backgroundImage:`url(${image})`
            
        }
    }


    const sliderChange = ({target})=>{
         
        setOptions((prevOption)=>{
            return prevOption.map((option,index)=>{
                if(index!== selectedIndex) return option;
                return {...option,value:target.value}
            })
        })
    }

    const downloadImage=()=>{
        htmlToImage.toPng(document.getElementById('image')).then((dataURL)=>{
            // console.log( download(dataURL,`${Date.now()}.png`));
            download(dataURL,`${Date.now()}.png`);
        }).catch(err=>console.log(err))
    }

    return (

        <div>
            <div>
                {
                    image ?(
                       
                        <div className="main-img" id="image" style={applyFilters()}></div>
                    ):(
                        <div className="body">
                              <h1>Photoshop Clone</h1>
                              <input type="file" accept="image/*" onChange={handleChange} />
                        </div>
                    )
                }
            </div>
            <div className="sideBar">
           {
               options.map((option,index)=>{
                   return(
                   <Sidebar key={index} name={option.name} active={index===selectedIndex} handleClick={()=>setSelectedIndex(index)}></Sidebar>
               )
               })
           }
           <button onClick={downloadImage} className="download">Download</button>
           </div>
        
           <Slider min={selectedOptions.range.min} max={selectedOptions.range.max} val={selectedOptions.value} sliderChange={sliderChange} ></Slider>
        </div>
    )
}

export default App
