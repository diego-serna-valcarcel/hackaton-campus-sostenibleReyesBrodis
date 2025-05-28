import "../css/Boton.css";

export const Boton = (props) => {
    return <button className="boton" onClick={props.onClick}> {props.texto}</button>;
};