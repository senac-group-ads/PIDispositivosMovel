import { ChangeEvent, useState } from "react";

interface UserPhoto {
    photo?: string | null
}

export function MediaPicker({ photo }: UserPhoto) {
    const [ previw, setPreview ] = useState<string | null | undefined>(photo)

    function onFileSected(event: ChangeEvent<HTMLInputElement>) {
        const { files } = event.target

        if (!files) {
            return
        }

        const previewURL = URL.createObjectURL(files[0])
        
        setPreview(previewURL)
    }

    return (
        <>
            <input 
                type="file"
                onChange={onFileSected}
                name="coverURL"
                id="media"
                accept="image/*"
                className="invisible h-0 w-0"
            />
            {previw && (
                    <img
                        src={previw} 
                        alt=""
                        className="aspect-video w-[10rem] h-[10rem] rounded-[50%] object-cover"
                    />
                )
            }
        </>
    )
}