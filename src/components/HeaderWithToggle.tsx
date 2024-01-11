import {
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { moon, sunny } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleDarkMode } from "../redux/darkModeSlice";

const HeaderWithToggle: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );

  const toggleDarkModeHandler = () => {
    dispatch(toggleDarkMode());
    document.body.classList.toggle("dark");
  };

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle slot="start">U.S. Congress</IonTitle>
        <IonButtons slot="end">
          <IonIcon icon={sunny} style={{ marginRight: "12px" }} />
          <IonToggle
            onIonChange={toggleDarkModeHandler}
            justify="space-between"
          ></IonToggle>
          <IonIcon
            icon={moon}
            style={{ marginLeft: "12px", marginRight: "12px" }}
          />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default HeaderWithToggle;
