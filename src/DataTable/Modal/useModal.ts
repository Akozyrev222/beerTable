import {useEffect, useState} from "react";
import axios from "axios";
import {Beer} from "../../types/data";

export const useModal = (currentModal: Beer | undefined | null) => {
    const [photo, setPhoto] = useState<string | null>()
    const [loading, setLoading] = useState(false)
    //const testPhoto = 'https://d14uq1pz7dzsdq.cloudfront.net/dc13deb9-f9f6-464a-b1fc-c3cf713531f4_.png?Expires=1712016216&Signature=dpnDEOOZ0qiV7gdWvHgxlrn1vVhMHO8NwiF3wdfrT6CftQOKbNSOsNwYHvp85i-KNsmKKPeScjnu3conm6NOq-JQScpq1DFANPAzTtoWfLuvrZ0Slx6dAzIae0H~M7qVoGpweFqPNuYTSbsql~FoN193K2Uqd6oRjm~QA-t2WMvR0~GVsaEvAnDlvIA7P9MoOedowziaPnx2exk7-Ti9Zcq9nX5gpFAQMFeQKMr2iHQbCLF7QXWQvXEBT5ZOqE4RGhPrdbgvTZxPOjbotZv0g5Nt8qTHzEtXsEftsS6BT6d2cW8BP6BqfKhaNlfUMgVk7KprW-g3Rv2VNrxGHTgrAQ__&Key-Pair-Id=K1F55BTI9AHGIK'
    const getPhoto = async () => {
        console.log('here')
        setLoading(true)
        const options = {
            method: "POST",
            url: "https://api.edenai.run/v2/image/generation",
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOTI3NjQ2YzMtNDg2OS00NzRiLWI1MjktNGJhNjhjZWM2OGE1IiwidHlwZSI6ImFwaV90b2tlbiJ9.XtPkBt_wqWa1HvOXOewBFRFyMJpslbd5dXa9JD8_fSs",
            },
            data: {
                providers: "openai",
                text: currentModal?.description,
                resolution: "1024x1024",
                fallback_providers: "",
            },
        };

        try {
            const response = await axios.request(options);
            setPhoto(response.data.openai.items[0].image_resource_url)
            setLoading(false)
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    /*const photoToState = () => {
        setPhoto(testPhoto)
        console.log(photo)
    }*/

    useEffect(() => {
        currentModal ?
            getPhoto()
            :
            setPhoto(null)
        //getPhoto()
    }, [currentModal])

    return {
        photo, loading
    }
}