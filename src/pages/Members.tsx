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
  IonText,
} from "@ionic/react";
import { ConfigProvider, Table, theme } from "antd";
import { ColumnsType } from "antd/es/table";
import { chevronForward, flag } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { LoadingSpinner } from "../components";
import HeaderWithToggle from "../components/HeaderWithToggle";
import { RootState } from "../redux/store";
import { getMembers } from "../services";
import "./Members.css";

const Members: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [senateMembers, setSenateMembers] = useState([]);
  const [filteredSenateMembers, setFilteredSenateMembers] = useState([]);
  const isDarkMode = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );
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
    history.push(`/members/${id}`);
  };

  const handleSearch = (event: CustomEvent) => {
    const searchTerm = event.detail.value;
    const filteredMembers = senateMembers.filter((senateMember: any) => {
      const memberName =
        `${senateMember.first_name} ${senateMember.last_name}`.toLocaleLowerCase();

      return memberName.includes(searchTerm);
    });

    setSearchTerm(event.detail.value);
    setFilteredSenateMembers(filteredMembers);
  };

  const list = searchTerm === "" ? senateMembers : filteredSenateMembers;

  interface DataType {
    key: string;
    name: string;
    state: string;
    party: string;
    gender: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "member",
      key: "name",
      render: (member) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IonAvatar aria-hidden="true" slot="start">
              <IonImg
                src={`https://theunitedstates.io/images/congress/225x275/${member.id}.jpg`}
                alt={`${member.first_name} ${member.last_name} Avatar`}
              ></IonImg>
            </IonAvatar>
            <IonText>
              {member.first_name} {member.last_name}
            </IonText>
          </div>
        );
      },
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (state) => {
        return state;
      },
    },
    {
      title: "Party",
      dataIndex: "party",
      key: "party",
      render: (party) => {
        return party;
      },
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => {
        return gender;
      },
    },
  ];

  const data: DataType[] = senateMembers.map((senateMember: any) => {
    return {
      key: senateMember.id,
      name: `${senateMember.first_name} ${senateMember.last_name}`,
      state: senateMember.state,
      party: senateMember.party,
      gender: senateMember.gender,
      member: senateMember,
    };
  });

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
                <IonList className="members-list">
                  <IonListHeader
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: "100%" }}>
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
                    <>
                      {list.map((senateMember: any, i) => {
                        const partyColor =
                          senateMember.party === "R"
                            ? "danger"
                            : senateMember.party === "D"
                            ? "primary"
                            : "warning";
                        return (
                          <IonItem
                            key={i}
                            onClick={() => handleItemClick(senateMember.id)}
                          >
                            <IonAvatar aria-hidden="true" slot="start">
                              <IonImg
                                src={`https://theunitedstates.io/images/congress/225x275/${senateMember.id}.jpg`}
                                alt={`${senateMember.first_name} ${senateMember.last_name} Avatar`}
                              ></IonImg>
                            </IonAvatar>
                            <IonLabel>
                              <strong>
                                {senateMember.first_name}{" "}
                                {senateMember.last_name}, {senateMember.state}
                              </strong>
                            </IonLabel>
                            <IonIcon
                              slot="start"
                              color={partyColor}
                              icon={flag}
                            ></IonIcon>
                            <IonIcon slot="end" icon={chevronForward} />
                          </IonItem>
                        );
                      })}
                    </>
                  )}
                </IonList>
                <ConfigProvider
                  theme={{
                    algorithm: isDarkMode
                      ? theme.darkAlgorithm
                      : theme.defaultAlgorithm,
                  }}
                >
                  <Table
                    className="members-table"
                    columns={columns}
                    dataSource={data}
                  />
                </ConfigProvider>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Members;
