import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
`;
export const Header = styled.View`
  width: 100%;
  margin: 20px 0 15px 0;
  height: ${RFPercentage(20)}px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Wrapper = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const CardBox = styled.View`
  width: 90%;
  border-radius: 4px;
  margin: 10px;
  height: ${RFValue(150)}px;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.colors.cards};
  border: 2px solid ${({ theme }) => theme.colors.border};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const ImageContainer = styled.View`
  flex: 1;
`;
export const Content = styled.View`
  flex: 1;
`;
export const Label = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.primary};
`;
export const ModalBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.cards};
`;
export const CloseBtn = styled.View`
  width: 100%;
  align-items: flex-end;
  margin-right: 50px;
`;
export const CloseLabel = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.primary};
`;
