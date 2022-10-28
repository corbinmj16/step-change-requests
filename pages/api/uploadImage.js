import {supabase} from "../../utils/supabase";

export default async function handler(req, res) {
    const { body } = req;
    try {
        const {data, error} = await supabase.storage.from('request-images').upload(`public/blah.jpg`, body.file);

        console.log(data);
        return res.status(200).json({ data });
    } catch (err) {
        res.status(500).send({ error: 'dang' })
    }
}