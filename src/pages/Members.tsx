import {
  IonAvatar,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getMembers } from "../services";
import HeaderWithToggle from "../components/HeaderWithToggle";
import { chevronForward, flag } from "ionicons/icons";
import { useHistory } from "react-router";
import { LoadingSpinner } from "../components";

const Members: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [senateMembers, setSenateMembers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const setUp = async () => {
      const members = await getMembers();
      setSenateMembers(members);
      setLoading(false);
    };

    setUp();
  }, []);

  const handleItemClick = (id: number) => {
    history.push(`/member/${id}`);
  };

  return (
    <IonPage>
      <HeaderWithToggle />
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IonCard
                style={{
                  width: "100%",
                  maxWidth: "750px",
                }}
              >
                <IonList>
                  <IonListHeader>
                    <IonLabel>Senate Members</IonLabel>
                  </IonListHeader>
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    senateMembers.map((senateMember: any, i) => (
                      <IonItem
                        key={i}
                        onClick={() => handleItemClick(senateMember.id)}
                      >
                        <IonAvatar aria-hidden="true" slot="start">
                          <IonImg
                            src={`https://theunitedstates.io/images/congress/225x275/${senateMember.id}.jpg`}
                            alt="Senate Member Avatar"
                          ></IonImg>
                        </IonAvatar>
                        <IonLabel>
                          {senateMember.first_name} {senateMember.last_name},{" "}
                          {senateMember.state}
                        </IonLabel>
                        <IonIcon
                          slot="start"
                          color={
                            senateMember.party === "R" ? "danger" : "primary"
                          }
                          icon={flag}
                        ></IonIcon>
                        <IonIcon slot="end" icon={chevronForward} />
                      </IonItem>
                    ))
                  )}
                </IonList>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Members;
