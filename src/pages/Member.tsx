import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { HeaderWithToggle, LoadingSpinner } from "../components";
import { chevronBack } from "ionicons/icons";
import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getMember } from "../services/propublicaService";

const Member: React.FC = () => {
  const history = useHistory();
  const params = useParams<any>();
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<any>({});

  useEffect(() => {
    const setUp = async () => {
      const member = await getMember(params.id);
      setMember(member);
      setLoading(false);
    };

    setUp();
  }, []);

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
                <IonCardHeader>
                  <IonIcon
                    icon={chevronBack}
                    onClick={() => {
                      history.push("/members");
                    }}
                    size="large"
                  />
                </IonCardHeader>
                <IonCardContent>
                  {loading && member !== null ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "centers",
                        }}
                      >
                        <div>
                          <IonImg
                            src={`https://theunitedstates.io/images/congress/225x275/${member.id}.jpg`}
                            alt="Senate Member Avatar"
                            style={{
                              maxWidth: "300px",
                              marginBottom: "24px",
                            }}
                          ></IonImg>
                        </div>
                      </div>
                      <IonList>
                        <IonItem>
                          <IonText slot="start">Name</IonText>
                          <IonText slot="end">
                            <strong>
                              {member.first_name} {member.last_name}
                            </strong>
                          </IonText>
                        </IonItem>
                        <IonItem>
                          <IonText slot="start">State</IonText>
                          <IonText slot="end">
                            <strong>{member.roles[0].state}</strong>
                          </IonText>
                        </IonItem>
                        <IonItem>
                          <IonText slot="start">Title</IonText>
                          <IonText slot="end">
                            <strong>{member.roles[0].title}</strong>
                          </IonText>
                        </IonItem>
                        <IonItem>
                          <IonText slot="start">Current Party</IonText>
                          <IonText slot="end">
                            <strong>{member.current_party}</strong>
                          </IonText>
                        </IonItem>
                        <IonItem>
                          <IonText slot="start">Gender</IonText>
                          <IonText slot="end">
                            <strong>{member.gender}</strong>
                          </IonText>
                        </IonItem>
                      </IonList>
                    </>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Member;
