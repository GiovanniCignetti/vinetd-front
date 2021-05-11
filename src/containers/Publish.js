import { Redirect, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Publish = ({ userToken }) => {
  let history = useHistory();

  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();
      // ajouter des paires clé/valeur
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);

      const response = await axios.post(
        // "https://vinted-giovanni.herokuapp.com/offer/publish",
        "http://localhost:3001/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
      setResponse(response);
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {userToken ? (
        <div className="containerBody">
          <div className="container">
            <h2>Vends ton article</h2>
            <form onSubmit={handleSubmit}>
              <div className="file-select">
                <div className="file-upload">
                  <label for="file" class="label-file">
                    <span className="input-sign">+</span>
                    <span>Ajoute une photo</span>
                  </label>
                  <input
                    className="input-file"
                    id="file"
                    type="file"
                    onChange={(event) => setPicture(event.target.files[0])}
                  />
                  {picture && (
                    <img src={URL.createObjectURL(picture)} alt="preview" />
                  )}
                </div>
              </div>

              <div className="text-input-publish">
                <div className="text-input">
                  <h4>Titre</h4>
                  <input
                    type="text"
                    placeholder="ex: Chemise Sézane verte"
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div className="text-input">
                  <h4>Décris ton article</h4>
                  <input
                    type="text"
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="ex: porté quelquefois, taille correctement"
                  />
                </div>
              </div>
              <div className="text-input-publish">
                <div className="text-input">
                  <h4>Marque</h4>
                  <input
                    type="text"
                    onChange={(event) => setBrand(event.target.value)}
                    placeholder="ex: Zara"
                  />
                </div>
                <div className="text-input">
                  <h4>Taille</h4>
                  <input
                    type="text"
                    onChange={(event) => setSize(event.target.value)}
                    placeholder="ex: L / 40 / 12"
                  />
                </div>
                <div className="text-input">
                  <h4>Couleur</h4>
                  <input
                    type="text"
                    onChange={(event) => setColor(event.target.value)}
                    placeholder="ex: Noir"
                  />
                </div>
                <div className="text-input">
                  <h4>Etat</h4>
                  <input
                    type="text"
                    onChange={(event) => setCondition(event.target.value)}
                    placeholder="ex: Neuf avec étiquette"
                  />
                </div>
                <div className="text-input">
                  <h4>Lieu</h4>
                  <input
                    type="text"
                    onChange={(event) => setCity(event.target.value)}
                    placeholder="ex: Tours"
                  />
                </div>
              </div>
              <div className="text-input-publish">
                <div className="text-input">
                  <h4>Prix</h4>
                  <input
                    type="text"
                    onChange={(event) => setPrice(event.target.value)}
                    placeholder="0,00€"
                  />
                </div>
              </div>
              <div className="form-button-div">
                <button type="submit">Ajouter</button>{" "}
              </div>
            </form>
            {/* {isLoading ? (
              <span>En cours de chargement...</span>
            ) : (
              <div>
                <p>réponse :{response}</p>
                <p>data :{data}</p>
                <img src={data.secure_url} alt="img-upload" />
              </div>
            )} */}
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

export default Publish;
