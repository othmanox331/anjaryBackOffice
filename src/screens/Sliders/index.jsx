import React, { useEffect, useState } from "react";
import SliderTable from "./components/Slider";
import { Card, Modal, Uploader } from "@components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { StyledEngineProvider } from "@mui/material/styles";
import { FaPlus } from "react-icons/fa";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { APIs } from "@services";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { toast, Bounce } from "react-toastify";

const URL =
  document.location.protocol + "//" + "neofast.io/app" + "/images/blogs/";

const Sliders = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [sliders, setSliders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ field: "", message: "" });

  useEffect(() => {
    getListOfSlider();
  }, []);
  const handleSubmit = () => {
    handleAddSlider();
  };

  const getListOfSlider = async () => {
    setIsLoading(true);
    try {
      const sliderList = await APIs.Slider.List();

      setSliders(sliderList.data);
    } catch (error) {
      toast.error("Error getting data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSlider = async () => {
    setIsLoading(true);
    if (!position) {
      setError({
        field: "position",
        message: "Veuillez saisir La position du slider",
      });
      return;
    }
    if (!acceptedFiles[0]) {
      setError({ field: "picture", message: "Veuillez upload une image" });
      return;
    }

    setError({ field: null, message: "" });

    let Data = new FormData();
    Data.append("file", !acceptedFiles[0] ? null : acceptedFiles[0]);
    Data.append("order", position);

    const sliders = await APIs.Slider.addNewSlider(Data);
    setIsLoading(false);
    if (sliders) {
      if (sliders.status === 200) {
        toast.success("Slider added !", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        setIsModalOpen(false);
      } else {
        toast.error(sliders.statusText, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  };

  return (
    <div className="product__container">
      <Card>
        <Row>
          <Col>
            <h2>Sliders list</h2>
          </Col>
          <Col md="auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-success"
            >
              <FaPlus />
            </button>
          </Col>
        </Row>
        <Row>
          <Col>
            <StyledEngineProvider>
              <SliderTable sliders={sliders} />
            </StyledEngineProvider>
          </Col>
        </Row>
      </Card>
      <Modal
        title="Add Slider"
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        onSave={handleSubmit}
      >
        {!isLoading ? (
          <>
            {" "}
            <TextField
              margin="dense"
              name="Slide position"
              label="Slide position"
              type="number"
              fullWidth
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              error={!!error && error.field === "position"}
            />
            <Uploader
              acceptedFiles={acceptedFiles}
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              error={error.field === "picture" ? error : null}
              //   isUpdate={isUpdate}
              //   picture={URL}
            />
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 220,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Modal>
    </div>
  );
};

export default Sliders;
