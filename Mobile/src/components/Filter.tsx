import { useNavigation } from "@react-navigation/native";
import { Link, Image } from "native-base";

import { AppNavigatorRoutesProps } from "../routes/app.routes";

type props = {
    img: undefined
    name: string
}

export function Filter({ img, name }: props){
    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function ListPet(name: string) {
        if(name === 'dog') {
            alert('gato') //TODO: user para criar o filtro de listagem de pet
        }
        navigation.navigate('listPets')
    }

    return (
        <Link onPress={() => ListPet(name)} id={name}>
            <Image source={img} marginRight={2}  alt="Gato" width={16} height={16}/>
        </Link>
    );
}