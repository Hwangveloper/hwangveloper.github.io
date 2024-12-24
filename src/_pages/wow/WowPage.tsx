import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import WowKeystoneTabContent from "./_components/WowKeystoneTabContent";
import WowCharacterTabContent from "./_components/WowCharacterTabContent";
import useWowMasterQuery from "./_apis/_queries/useWowMasterQuery";
import useLoader from "../../common/_stores/useLoader";
import useWowStore from "./_stores/useWowStore";
import useGoogleApiStore from "../../common/_stores/useGoogleApiStore";
import { useShallow } from "zustand/shallow";
import useWowCharacterQuery from "./_apis/_queries/useWowCharacterQuery";
import useWowDungeonQuery from "./_apis/_queries/useWowDungeonQuery";

// 속성을 위한 유틸리티 함수
const tabProps = (index: number) => ({
  id: `vertical-tab-${index}`,
  "aria-controls": `vertical-tabpanel-${index}`,
});

const WowPage: React.FC = () => {

  const { authStatus } = useGoogleApiStore(
    useShallow((state) => ({
      authStatus: state.authStatus,
    }))
  );

  const [tabValue, setTabValue] = useState<number>(0);

  const { data, isFetched, isFetching } = useWowMasterQuery(authStatus ? { ignoreDelete: true } : undefined);
  const { data: charData, isFetched: isCharFetched, isFetching: isCharFetching, refetch: refetchChar } = useWowCharacterQuery(authStatus ? { ignoreDelete: true } : undefined);
  const { data: dungeonData, isFetched: isDungeonFetched, isFetching: isDungeonFetching } = useWowDungeonQuery(authStatus ? { ignoreDelete: true } : undefined);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  }

  useEffect(() => {
    if (data && isFetched && !isFetching) {
      useWowStore.setState({
        masterList: data,
      });
    }
  }, [data, isFetched, isFetching]);

  useEffect(() => {
    if (charData && isCharFetched && !isCharFetching) {
      useWowStore.setState({
        characterList: charData,
      });
    }
  }, [charData, isCharFetched, isCharFetching]);

  useEffect(() => {
    if (dungeonData && isDungeonFetched && !isDungeonFetching) {
      useWowStore.setState({
        dungeonList: dungeonData,
      });
    }
  }, [dungeonData, isDungeonFetched, isDungeonFetching]);

  useEffect(() => {
    useLoader.setState({ isLoading: isFetching });
  }, [isFetching]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabValue}
        onChange={handleChange}
        aria-label="customized tabs"
        textColor="inherit"
        TabIndicatorProps={{
          style: { backgroundColor: "#fff" }, // 선택된 탭 하단선 색상
        }}
        sx={{
          bgcolor: "#f5f5f5", // 배경색
          borderRight: 1,
          borderColor: "divider",
          width: "200px",
          "& .MuiTab-root": {
            alignItems: "flex-start", // 텍스트 왼쪽 정렬
            textTransform: "none", // 텍스트 대문자 변환 비활성화
            paddingLeft: "16px",
            color: "gray", // 선택되지 않은 탭 색상
          },
          "& .Mui-selected": {
            color: "black", // 선택된 탭 색상
            fontWeight: "bold",
          },
        }}
      >
        <Tab label="쐐기" {...tabProps(0)} />
        <Tab label="캐릭터" {...tabProps(1)} />
      </Tabs>
      <Box
        component={"div"}
        role="tabpanel"
        hidden={tabValue !== 0}
        id={`vertical-tabpanel-${0}`}
        aria-labelledby={`vertical-tab-${0}`}
        width="100%"
      >
        {tabValue === 0 && (
          <WowKeystoneTabContent />
        )}
      </Box>
      <Box
        component={"div"}
        role="tabpanel"
        hidden={tabValue !== 1}
        id={`vertical-tabpanel-${1}`}
        aria-labelledby={`vertical-tab-${1}`}
        width="100%"
      >
        {tabValue === 1 && (
          <WowCharacterTabContent refetch={refetchChar}/>
        )}
      </Box>
    </Box>
  );
};

export default WowPage;
