import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const NewColorForm = ({ addColor }) => {

    // const INITIAL_STATE = {
    //     name: '',
    //     hex: '#ffffff',
    // }
    const [formData, setFormData] = useState({name: "", hex:"#ffffff"});
    const history = useHistory();

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
        ...formData,
        [name]: value
    }))
    }

    // function handleChange(e) {
    //     e.persist();
    //     setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        addColor({ [formData.name]: formData.hex });
        history.push("/colors");
    // setFormData(INITIAL_STATE)
    }

    return (
    <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="name">Color name:</label>
        <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter color name"
            value={formData.name}
            onChange={handleChange}
        />
        </div>

        <div>
        <label htmlFor="hex">Color value:</label>
        <input
            id="hex"
            type="color"
            name="hex"
            value={formData.hex}
            onChange={handleChange}
        />
        </div>

        <input type="Submit" value="Add this color" readOnly />
    </form>
    )

}

export default NewColorForm;