import {supabase} from "../../utils/supabase";

export default async function handler(req, res) {
    const { body } = req;
    try {
        const {data, error} = await supabase.storage.from('request-images').upload(`public/blah.jpg`, body);
        console.log('uploadImage api data: ', data);

        return res.status(200).json({ data, message: 'hey nice image' });
    } catch (err) {
        res.status(500).send({ error: 'dang' })
    }
}