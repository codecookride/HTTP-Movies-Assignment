import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
    id: 5,
    title: '',
    director: '',
    metascore: 89,
    stars: [''],
};

const UpdateMovie = props => {
  const [item, setItem] = useState(initialMovie);
console.log(props);
  useEffect(() => {
    const selectedItem = props.items.find(item => {
      return `${item.id}` === props.match.params.id;
    });
    console.log(selectedItem);
    if (selectedItem) {
      setItem(selectedItem);
    }
  }, [props.items, props.match.params.id]);

  const changeHandler = e => {


    setItem({
      ...item,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${item.id}`, item)
      .then(res => {
        console.log(res);
        props.updateItems(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={item.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={item.director}
        />
        <div className="baseline" />

        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="meta score"
          value={item.metascore}
        />
        <div className="baseline" />

        <input
          type="text"
          name="description"
          onChange={changeHandler}
          placeholder="stars"
          value={item.stars}
        />
        <div className="baseline" />

       
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
