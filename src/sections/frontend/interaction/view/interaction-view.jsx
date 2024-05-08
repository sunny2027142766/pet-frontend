import { Box } from "@mui/material";
import { useState, useEffect } from "react";

import {
  getPetHealthInfoApi,
  updatePetHealthInfoApi,
  getUserFunctionConfigApi,
} from "src/api/modules/pet";

import FunctionWidget from "../function-widget";
import InteractionCard from "../interaction-card";
import HealthCard from "../health-card";
import BottomCard from "../bottom-card";

export default function InteractionView() {
  const [playAnimation, setPlayAnimation] = useState(false);
  const [modelList, setModelList] = useState([]);
  const [model, setModel] = useState({});
  const [funcs, setFuncs] = useState([]);

  const [cursorUrl, setCursorUrl] = useState("");
  const [interactionState, setInteractionState] = useState({
    message: "",
    position: [0, 0, 0],
    visible: false,
  });

  const [health, setHealth] = useState(0);
  const [mood, setMood] = useState(0);
  const [hunger, setHunger] = useState(0);

  const handleToggleAnimation = () => {
    setPlayAnimation(!playAnimation);
  };

  const handleStroke = async (index) => {
    console.log("抚摸功能===>", index);
    setCursorUrl("/assets/images/cursor/Stroke.svg");
    setInteractionState({
      message: "心情值增加!!!",
      position: [0, 5.0, 0],
      visible: true,
    });
    const { data } = await updatePetHealthInfoApi(model.pid, {
      happy: mood < 5 ? mood + 1 : mood,
    });
    if (data === true) {
      setMood((prev) => (prev < 5 ? prev + 1 : prev));
    }
  };

  const handleExpress = async (index) => {
    console.log("表情功能===>", index);
    setCursorUrl("/assets/images/cursor/Express.svg");
    setInteractionState({
      message: "心情值增加!!!",
      position: [0, 5.0, 0],
      visible: true,
    });
    const { data } = await updatePetHealthInfoApi(model.pid, {
      happy: mood < 5 ? mood + 1 : mood,
    });
    if (data === true) {
      setMood((prev) => (prev < 5 ? prev + 1 : prev));
    }
  };

  const handleFeed = async (index) => {
    console.log("喂食功能===>", index);
    setCursorUrl("/assets/images/cursor/Feed.svg");
    setInteractionState({
      message: "饥饿值减少!!!",
      position: [0, 5.0, 0],
      visible: true,
    });
    const { data } = await updatePetHealthInfoApi(model.pid, {
      hungry: hunger > 0 ? hunger - 1 : hunger,
    });
    if (data === true) {
      setHunger((prev) => (prev > 0 ? prev - 1 : prev));
    }
  };

  const handleDrink = async (index) => {
    console.log("喝水功能===>", index);
    setCursorUrl("/assets/images/cursor/Drink.svg");
    setInteractionState({
      message: "健康值增加!!!",
      position: [0, 5.0, 0],
      visible: true,
    });
    const { data } = await updatePetHealthInfoApi(model.pid, {
      health: health < 5 ? health + 1 : health,
    });
    if (data === true) {
      setHealth((prev) => (prev < 5 ? prev + 1 : prev));
    }
  };

  const handleClean = async (index) => {
    console.log("清洁功能===>", index);
    setCursorUrl("/assets/images/cursor/Clean.svg");
    setInteractionState({
      message: "健康值增加!!!",
      position: [0, 5.0, 0],
      visible: true,
    });
    const { data } = await updatePetHealthInfoApi(model.pid, {
      health: health < 5 ? health + 1 : health,
    });
    if (data === true) {
      setHealth((prev) => (prev < 5 ? prev + 1 : prev));
    }
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    setCursorUrl("");
    setInteractionState({
      message: "",
      position: [0, 0, 0],
      visible: false,
    });
  };

  const handleChangeModel = async (index) => {
    console.log("点击底部模型===>", index);
    setModel(modelList.find((item) => item.pid === index));
    await getHealthCardInfo(index);
  };

  const getModelList = async () => {
    try {
      const { data } = await getUserFunctionConfigApi();
      setModelList(data.modelList);
      setModel(data.modelList[0]);
      setFuncs(data.funcs);
      await getHealthCardInfo(data.modelList[0]?.pid);
    } catch (error) {
      console.error("Error fetching model list:", error);
    }
  };

  const getHealthCardInfo = async (pid) => {
    try {
      const { data } = await getPetHealthInfoApi(pid);
      console.log(data);
      setHealth(data.health);
      setMood(data.happy);
      setHunger(data.hungry);
    } catch (error) {
      console.error("Error fetching health card info:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getModelList();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{ height: 1, cursor: `url(${cursorUrl}), auto` }}
      onContextMenu={handleRightClick}
    >
      <InteractionCard
        model={model}
        playAnimation={playAnimation}
        modelList={modelList}
        interactionState={interactionState}
      />
      <FunctionWidget
        onToggleAnimation={handleToggleAnimation}
        onStroke={handleStroke}
        onExpress={handleExpress}
        onFeed={handleFeed}
        onDrink={handleDrink}
        onClean={handleClean}
        funcs={funcs}
      />
      <BottomCard onChangeModel={handleChangeModel} modelList={modelList} />
      {health !== null && mood !== null && hunger !== null && (
        <HealthCard health={health} mood={mood} hunger={hunger} />
      )}
      {/* <HealthCard health={health} mood={mood} hunger={hunger} /> */}
    </Box>
  );
}
