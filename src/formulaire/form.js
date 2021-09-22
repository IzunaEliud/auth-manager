import React from 'react'
import { useState } from 'react'
import './formulaire.css'
import axios from 'axios'

export default function Nav() {
    const [selecteur, setSelecteur] = useState(1)
    const [name, setname] = useState("")
    const [surname,setsurname]=useState("")
    const [pass, setPass] = useState("")
    const [confirm, setConfirm] = useState("")
    const [resultas,setresultas]=useState("")
    const [email, setemail] = useState("")
    const select=(index)=>{
        setSelecteur(index)
    }
    const nameChange=(e)=>{
        setname(e.target.value)
    }
    const surnameChange=(e)=>{
        setsurname(e.target.value)
    }
    const passChange=(e)=>{
        setPass(e.target.value)
    }
    const confirmChange=(e)=>{
        setConfirm(e.target.value)
    }
    const emailChange=(e)=>{
        setemail(e.target.value)
    }
    const signClick=(e)=>{
        if(name==="",surname==="",pass==="",confirm==="",email===""){
            setresultas("merci de remplir tous les champs")
        }
        else{
            if(pass===confirm){
                axios.post(`http://localhost:5000/sign-up/${name}/${surname}/${email}/${pass}`)
                .then(res=>{
                    setresultas(res.data.value)
                })
            }
            else{
                setresultas("le mot de pass et sa confirmation doivent etre identique")
            }
        }
        
        
    }

    return (
        <div>
            <div className="navform">
                <button name="signUp" className={selecteur===1?"btn btn-nav btnSelect":"btn btn-nav"} onClick={()=>select(1)}>Sign Up</button>
                <button name="signIn" className={selecteur===2?"btn btn-nav btnSelect":"btn btn-nav"} onClick={()=>select(2)}>Sign In</button>
            </div>
            <div className="formContent">
                <form className={selecteur===1?"form":"form-inactive"}>
                    <label for="name1">Nom</label>
                    <input className="input" type="text" id="name1" placeholder="entrez votre nom" value={name} onChange={nameChange} required/>
                    <label for="surname">Prenom</label>
                    <input className="input" type="text" id="surname" placeholder="entrez votre prenom" value={surname} onChange={surnameChange} required/>
                    <label for="email">Email</label>
                    <input className="input" type="text" id="email" placeholder="entrez votre email" value={email} onChange={emailChange} required/>
                    <label for="password">Mot de passe</label>
                    <input className="input" type="password" id="password1" placeholder="entrez votre mot de passe" value={pass} onChange={passChange} required/>
                    <label for="confirm_password">confirmer mot de passe</label>
                    <input className="input" type="password" id="confirm_password" placeholder="confirmer votre mot de passe" value={confirm} onChange={confirmChange} required/>
                    <input className="btn btn-submit" type="button" id="send" value="sign in" onClick={signClick}/>
                </form>
                <form className={selecteur===2?"form":"form-inactive"}>
                    <label for="name2">Identifiant</label>
                    <input className="input" id="name2" type="text" placeholder="entrez votre nom" value={name} onChange={nameChange}/>
                    <label for="password2">mot de passe</label>
                    <input className="input" id="password2" type="password" placeholder="entrez votre mot de pass" value={pass}/>
                    <input className="btn btn-submit" type="submit" value="connexion"/>
                </form>
                <div>{resultas}</div>
            </div>
        </div>
        
    )
}
