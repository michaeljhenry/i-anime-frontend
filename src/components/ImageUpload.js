import React, {useRef, useState, useEffect} from 'react';

// import '../styles/components/ImageUpload.scss';

const ImageUpload = (props) => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState();
    const filePickerRef = useRef(); // establishes a connection to the input DOM node


    useEffect(() => {
        if(!file) {
            return;
        }
        const fileReader = new FileReader(); // packed into the browser
        fileReader.onload = () => { // when it's done parsing the selected file.
            setPreviewUrl(fileReader.result);
        } // need to run this whenever we're done readAsDataUrl
        fileReader.readAsDataURL(file); // create a url you can output
    }, [file])

    const pickedHandler = (event) => {
        let pickedFile;
        let fileIsValid = isValid;
        if(event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onImageUpload(pickedFile, fileIsValid);
        //props.onInput(props.id, pickedFile, fileIsValid);
    }

    const pickImageHandler = () => {
        filePickerRef.current.click(); // able to utilize the input element without seeing it 
        }

    return(
        <div className = 'form-control'>
            <input 
                id = {props.id} 
                ref = {filePickerRef}
                style = {{display: 'none'}}
                type = "file" 
                accept = '.jpg,.png,.jpeg'
                onChange = {pickedHandler}
            />
            <div className = {`image-upload ${props.center && 'center'}`}>
                <div className = 'image-upload__preview'>
                    {previewUrl && <img src = {previewUrl} alt = "Preview"/>}
                    {!previewUrl && <p>Please pick an image.</p>}
                </div>
                <button type = 'button' onClick = {pickImageHandler}>PICK IMAGE</button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    )
}

export default ImageUpload;