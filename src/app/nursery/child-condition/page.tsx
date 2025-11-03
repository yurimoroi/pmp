"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ClassSelect } from "@/components/child-condition/ClassSelect";
import { NameSelect } from "@/components/child-condition/NameSelect";
import { PickupSelect } from "@/components/child-condition/PickupSelect";
import { ConditionCheck } from "@/components/child-condition/ConditionCheck";
import { PlaySelect } from "@/components/child-condition/PlaySelect";
import { AbsenceReasonSelect } from "@/components/child-condition/AbsenceReasonSelect";
import { ConfirmScreen } from "@/components/child-condition/ConfirmScreen";
import { useUser } from "@/context/userContext";
// import { handleApiError } from "@/utility/api/apiHelper";
import { ActionButton } from "@/components/common/Button";

type CheckinStep = "class" | "name" | "pickup" | "condition" | "play" | "reason" | "confirm" | "complete";
type CheckoutStep = "class" | "name" | "confirm" | "complete";
type AbsenceStep = "class" | "name" | "reason" | "confirm" | "complete";

function ChildConditionPageContent() {
  const { user } = useUser();
  const nurseryName = user?.nickname;

  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode") as "checkin" | "checkout" | "absence";

  const [step, setStep] = useState<CheckinStep | CheckoutStep | AbsenceStep>("class");
  const [selectedClassName, setSelectedClassName] = useState<string>("");
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  const [selectedChildName, setSelectedChildName] = useState<string>("");
  const [pickupTime, setPickupTime] = useState<string | null>(null);
  const [pickupPersonName, setPickupPersonName] = useState<string | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [condition, setCondition] = useState<string | null>(null);
  const [hasMedicine, setHasMedicine] = useState<boolean>(false);
  const [canOutdoorPlay, setCanOutdoorPlay] = useState<boolean | null>(null);
  const [canWaterPlay, setCanWaterPlay] = useState<boolean | null>(null);
  const [absenceReason, setAbsenceReason] = useState<string | null>(null);
  const [absenceDetail, setAbsenceDetail] = useState<string | null>(null);
  const [isSuspension, setIsSuspension] = useState<boolean>(false);
  const [isWaterPlayEnabled, setIsWaterPlayEnabled] = useState<boolean>(false);
  const [isMedicationEnabled, setIsMedicationEnabled] = useState<boolean>(false);

  const handleClassSelect = (className: string) => {
    setSelectedClassName(className);
    setStep("name");
  };

  const handleNameSelect = (childId: number, name: string) => {
    setSelectedChildId(childId);
    setSelectedChildName(name);
    if (mode === "checkin") {
      setStep("pickup");
    } else if (mode === "checkout") {
      setStep("confirm");
    } else if (mode === "absence") {
      setStep("reason");
    }
  };

  const handlePickupComplete = (time: string, personName: string) => {
    setPickupTime(time);
    setPickupPersonName(personName);
    setStep("condition");
  };

  const handleConditionComplete = (temp: number, cond: string, hasMedicine: boolean) => {
    setTemperature(temp);
    setCondition(cond);
    setHasMedicine(hasMedicine);
    setStep("play");
  };

  const handlePlayComplete = (outdoorPlay: boolean, waterPlay: boolean | null) => {
    setCanOutdoorPlay(outdoorPlay);
    setCanWaterPlay(waterPlay);
    setStep("confirm");
  };

  const handleReasonComplete = (reason: string, detail: string, isSuspension: boolean) => {
    setAbsenceReason(reason);
    setAbsenceDetail(detail);
    setIsSuspension(isSuspension);
    setStep("confirm");
  };

  const handleBack = () => {
    switch (step) {
      case "name":
        setStep("class");
        break;
      case "pickup":
        setStep("name");
        break;
      case "condition":
        setStep("pickup");
        break;
      case "play":
        setStep("condition");
        break;
      case "reason":
        setStep("name");
        break;
      case "confirm":
        if (mode === "checkin") {
          setStep("play");
        } else if (mode === "checkout") {
          setStep("name");
        } else {
          setStep("reason");
        }
        break;
      default:
        break;
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch("/api/children/conditions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode,
          childId: selectedChildId,
          pickupPlanTime: pickupTime,
          pickupPerson: pickupPersonName,
          bodyTemperature: temperature,
          conditions: condition,
          takeMedicineFlg: isMedicationEnabled ? hasMedicine : null,
          playingOutside: canOutdoorPlay,
          playingWater: isWaterPlayEnabled ? canWaterPlay : null,
          absenceReason,
          absenceReasonDetail: absenceDetail,
          stopAttendanceFlg: isSuspension,
        }),
      });

      if (!response.ok) {
        // handleApiError(response);

        if (response.status === 400) {
          return;
        }
        throw new Error("登録に失敗しました");
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
      alert("処理に失敗しました。もう一度お試しください。");
      return;
    }

    setStep("complete");
  };

  const handleBackToHome = () => {
    if (mode === "absence") {
      router.push("/nursery/admin");
    } else {
      router.push("/nursery");
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await fetch(`/api/nursery/settings?nursery=${user?.nickname}`);
      const data = await response.json();
      setIsWaterPlayEnabled(data.data.playingWaterDisplayFlg);
      setIsMedicationEnabled(data.data.takeMedicineDisplayFlg);
    };

    fetchSettings();
  }, [nurseryName, user?.nickname]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <main className={`mx-auto p-6 ${step === "name" ? "max-w-7xl" : "max-w-xl"}`}>
        <h1 className="text-2xl font-bold text-gray-700 mb-8 text-center">{mode === "checkin" ? "登園" : mode === "checkout" ? "降園" : "欠席"}</h1>

        {step === "class" && <ClassSelect onSelect={handleClassSelect} mode={mode} />}

        {step === "name" && selectedClassName && (
          <>
            <NameSelect className={selectedClassName} onSelect={handleNameSelect} mode={mode} />
            <div className="mt-8">
              <ActionButton onClick={handleBack} variant={mode === "absence" ? "tertiary-secondary" : "tertiary-primary"}>
                戻る
              </ActionButton>
            </div>
          </>
        )}

        {mode === "checkin" && (
          <>
            {step === "pickup" && (
              <>
                <PickupSelect onComplete={handlePickupComplete} />
                <div className="mt-8">
                  <ActionButton onClick={handleBack} variant="tertiary-primary">
                    戻る
                  </ActionButton>
                </div>
              </>
            )}

            {step === "condition" && (
              <>
                <ConditionCheck onComplete={handleConditionComplete} isMedicationEnabled={isMedicationEnabled} />
                <div className="mt-8">
                  <ActionButton onClick={handleBack} variant="tertiary-primary">
                    戻る
                  </ActionButton>
                </div>
              </>
            )}

            {step === "play" && (
              <>
                <PlaySelect onComplete={handlePlayComplete} isWaterPlayEnabled={isWaterPlayEnabled} />
                <div className="mt-8">
                  <ActionButton onClick={handleBack} variant="tertiary-primary">
                    戻る
                  </ActionButton>
                </div>
              </>
            )}
          </>
        )}

        {mode === "absence" && step === "reason" && (
          <>
            <AbsenceReasonSelect onComplete={handleReasonComplete} />
            <div className="mt-8">
              <ActionButton onClick={handleBack} variant="tertiary-secondary">
                戻る
              </ActionButton>
            </div>
          </>
        )}

        {step === "confirm" &&
          (mode === "checkin" ? (
            <ConfirmScreen
              className={selectedClassName}
              childName={selectedChildName}
              pickupTime={pickupTime}
              pickupPersonName={pickupPersonName}
              temperature={temperature}
              condition={condition}
              hasMedicine={hasMedicine}
              canOutdoorPlay={canOutdoorPlay}
              canWaterPlay={canWaterPlay}
              isSuspension={null}
              isMedicationEnabled={isMedicationEnabled}
              isWaterPlayEnabled={isWaterPlayEnabled}
              onConfirm={handleConfirm}
              onBack={handleBack}
            />
          ) : mode === "checkout" ? (
            <ConfirmScreen
              className={selectedClassName}
              childName={selectedChildName}
              hasMedicine={null}
              canOutdoorPlay={null}
              canWaterPlay={null}
              isSuspension={null}
              onConfirm={handleConfirm}
              onBack={handleBack}
            />
          ) : (
            <ConfirmScreen
              className={selectedClassName}
              childName={selectedChildName}
              hasMedicine={null}
              canOutdoorPlay={null}
              canWaterPlay={null}
              absenceReason={absenceReason}
              absenceDetail={absenceDetail}
              isSuspension={isSuspension}
              onConfirm={handleConfirm}
              onBack={handleBack}
            />
          ))}

        {step === "complete" && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-700">送信完了</h2>
            <p className="text-gray-600">
              {mode === "checkin" ? "登園" : mode === "checkout" ? "降園" : "欠席"}
              情報が正常に送信されました。
            </p>
            <div className="mt-8">
              {/* <button
                onClick={handleBackToHome}
                className={`w-full py-4 px-8 rounded-2xl text-white font-bold transition-all duration-200 ${
                  mode === "absence"
                    ? "bg-violet-500 hover:bg-violet-600"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {mode === "absence" ? "管理画面へ戻る" : "ホームへ戻る"}
              </button> */}

              <ActionButton onClick={handleBackToHome} variant={mode === "absence" ? "secondary" : "primary"}>
                {mode === "absence" ? "管理画面へ戻る" : "ホームへ戻る"}
              </ActionButton>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function ChildConditionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChildConditionPageContent />
    </Suspense>
  );
}
