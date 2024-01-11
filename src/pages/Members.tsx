import {
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
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
  const [searchTerm, setSearchTerm] = useState("");

  const [senateMembers, setSenateMembers] = useState([]);
  const [filteredSenateMembers, setFilteredSenateMembers] = useState([]);
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

  const handleSearch = (event: CustomEvent) => {
    const searchTerm = event.detail.value;
    const filteredMembers = senateMembers.filter((senateMember: any) => {
      return (
        (senateMember.first_name as string)
          .toLocaleLowerCase()
          .includes(searchTerm) ||
        (senateMember.last_name as string)
          .toLocaleLowerCase()
          .includes(searchTerm)
      );
    });

    setSearchTerm(event.detail.value);
    setFilteredSenateMembers(filteredMembers);
  };

  const list = searchTerm === "" ? senateMembers : filteredSenateMembers;

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
                <IonCardHeader>Congressional Members</IonCardHeader>
                <IonList>
                  <IonListHeader
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: "100%" }}>
                      <IonLabel>Senate Members</IonLabel>
                      <IonInput
                        placeholder="Search"
                        clearInput={true}
                        onIonInput={(e) => handleSearch(e)}
                        value={searchTerm}
                      />
                    </div>
                  </IonListHeader>
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    list.map((senateMember: any, i) => (
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
