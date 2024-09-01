import React , { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import Footer from "./components/footer";
import useStyles from './styles'
import wordsToNumbers from "words-to-numbers";
import dotenv from 'dotenv'

dotenv.config()

const alanKey=process.env.ALANKEY; //Integrations in Alan AI site

function App(){

    const [newsArticles, setnewsArticles] =useState([]);
    const [activeArticle, setActiveArticle]=useState(-1); //0-index of article currently being read
    const classes=useStyles();

    //useEffect takes a function and an array(if array is empty it's gonna run only once)
    useEffect(()=> {
        alanBtn({
            key:alanKey,
            onCommand: ({command, articles, number})=>{ //articles are received here
                if (command==='newHeadlines') {
                    setnewsArticles(articles); //setting newsArticles 
                    setActiveArticle(-1);
                } 
                else if(command==='highlight'){
                    setActiveArticle((prevActiveArticle)=>prevActiveArticle+1);
                }
                else if(command==='open'){
                    //converting words to numbers
                    console.log(number);
                    const parsedNumber =number.length > 2? wordsToNumbers(number, {fuzzy: true}) : number;
                    const article=articles[parsedNumber -1];
                    if(parsedNumber>20){
                        //alanBtn().playText('Please try that again.');
                        alert('Sorry, Please try that again.');
                    } else if(article){
                        window.open(article.url, '_blank');
                        //alanBtn().playText('Opening...');
                    }
                    
                }
            }
        })
    },[]) 
        
    return(
        <div>
            <div className={classes.logoContainer}>
                <img src="https://assets-global.website-files.com/64ec3fc5bb945b48c0a37b1c/64ec859abeec7a9efe7eef25_logo.svg" className={classes.alanLogo} alt="logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
            <Footer />
        </div>
    );
}

export default App;