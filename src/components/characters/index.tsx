import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  FlatList,
  Modal,
  View
} from "react-native";
import { Api } from "../../services/Api";
import {
  Container,
  Header,
  CardBox,
  Wrapper,
  ImageContainer,
  Content,
  Label,
  ModalBox,
  CloseBtn,
  CloseLabel
} from "./styles";
import { Feather } from "@expo/vector-icons";
interface characterProps {
  id: number;
  name: string;
  species: string;
  gender: string;
  image: string;
}
interface Props {
  onLayout: () => void;
}

//*Set image according to the  aspect ratio
const image = require("../../assets/banner.png");
const SCREEN_WIDTH = Dimensions.get("window").width;
const { width, height } = Image.resolveAssetSource(image);
const ratio = height / width;

export function Characters({ onLayout }: Props) {
  const [character, setCharacter] = useState<characterProps[]>();
  const [characterDetails, setCharacterDetails] = useState<characterProps>();
  const [isOpen, setIsOpen] = useState(false); //*Open and close modalBox

  useEffect(() => {
    Api.get("character").then((res) => setCharacter(res.data.results));
  }, []);

  const getDataCharacter = (id: number) => {
    const value: characterProps[] | any = character?.filter(
      (item) => item.id === id
    );

    let parsed: any = {};

    value.forEach(function (item: any) {
      for (let i in item) {
        parsed[i] = item[i];
      }
    });
    setCharacterDetails(parsed);
  };
  return (
    <Container onLayout={onLayout}>
      <Header>
        <Image
          source={image}
          style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * ratio }}
        />
      </Header>

      <View>
        <FlatList
          data={character}
          keyExtractor={(item: any) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Wrapper
              onPress={() => {
                setIsOpen(true);
                getDataCharacter(item.id);
              }}
            >
              <CardBox>
                <ImageContainer>
                  <Image
                    style={{ height: 120, width: 120 , borderRadius:60 }}
                    source={{ uri: item.image }}
                  />
                </ImageContainer>

                <Content>
                  <Label>Name: {item.name}</Label>
                  <Label>Gender: {item.gender}</Label>
                  <Label>Specie: {item.species}</Label>
                </Content>
              </CardBox>
            </Wrapper>
          )}
        />
        <Modal
          animationType="slide"
          visible={isOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          <ModalBox>
          <CloseBtn>
          <Feather name="x-square" size={36} color="black"
          onPress={() => setIsOpen(false)}
          />
          </CloseBtn>
       
         
         
            <Image
              style={{
                height: 300,
                width: 300,
                marginBottom: 20,
                borderRadius: 200,
              }}
              source={{ uri: characterDetails?.image }}
            />
            <Label>Name: {characterDetails?.name}</Label>
            <Label>Gender: {characterDetails?.gender}</Label>
            <Label>Specie: {characterDetails?.species}</Label>
            
          </ModalBox>
        </Modal>
      </View>
    </Container>
  );
}
