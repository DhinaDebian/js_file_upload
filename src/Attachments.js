import React from "react"

const Attachments = ({ onSelect, fileSize = 3, disabled = false, fileType = ['jpg', 'jpeg', 'png', 'pdf'] }) => {
	const onChange = (e) => {
		e.preventDefault()
		let filesArr = e.target.files
		if (filesArr !== undefined && filesArr.length > 0 && (filesArr[0].length === 0 && (filesArr[0].size / 1024 / 1024) > fileSize)) {
			alert(`Please upload file size below ${fileSize}MB`)
		} else if (filesArr !== undefined && filesArr.length > 0) {
			let tmpFileTypes = ""
			fileType.map(file => tmpFileTypes += `\\.${file}|`)
			tmpFileTypes = new RegExp(`(${tmpFileTypes.substring(0, (tmpFileTypes.length - 1))})$`, "i")
			let allowedExtensions = tmpFileTypes;
			if (!allowedExtensions.exec(filesArr[0].name.substring(filesArr[0].name.length, (filesArr[0].name.lastIndexOf("."))))) {
				alert(`Please upload only ${fileType.join(', ')} file.`)
				filesArr = null
			} else {
				convertToBase64(filesArr)
				e.target.value = null
			}
		}
	}

	const convertToBase64 = (selectedFile) => {
		let base64 = null
		//Check File is not Empty
		if (selectedFile.length > 0) {
			// Select the very first file from list
			let fileToLoad = selectedFile[0]
			// FileReader function for read the file.
			let fileReader = new FileReader()

			// Onload of file read the file content
			fileReader.onload = function (fileLoadedEvent) {
				base64 = fileLoadedEvent.target.result
				onSelect({
					FileName: fileToLoad.name,
					FileContent: base64
				})
			}
			// Convert data to base64
			fileReader.readAsDataURL(fileToLoad)
		} else {
			base64 = null
		}
		return base64
	}

	return (
		<label>
			<input type="file" onChange={onChange} disabled={disabled} />
			<div>
				{/* <BackupIcon style={{ fontSize: "24px", color: "#fff" }} /> */}
				<label style={{ marginLeft: '0.6rem', color: "#fff", marginBottom: 0 }}>
					Choose File
				</label>
			</div>
		</label>
	)
}

export default Attachments