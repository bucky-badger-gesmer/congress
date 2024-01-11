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
import "./Members.css";
import { Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

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
    age: number;
    address: string;
    tags: string[];
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

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
                        console.log("sena", senateMember);
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
                                alt="Senate Member Avatar"
                              ></IonImg>
                            </IonAvatar>
                            <IonLabel>
                              {senateMember.first_name} {senateMember.last_name}
                              , {senateMember.state}
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
                <Table
                  className="members-table"
                  columns={columns}
                  dataSource={data}
                />
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Members;
