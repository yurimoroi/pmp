"use client";

import { StaffInfoForm } from "@/components/staff/StaffInfoForm";
import {
  type StaffBasicInfo,
  type StaffSalaryInfo,
  type CareerEntry,
  type StaffInfoResponse,
  type Career,
} from "@/types/staff";
import { useEffect, useState } from "react";
import {
  EmployeeBasicSalary,
  AreaAllowance,
  EnrollmentWage,
  HourlyWage,
  QualificationAllowance,
  PostAllowance,
} from "@/types/staff";
import { useSession } from "next-auth/react";
import { handleApiError } from "@/utility/api/apiHelper";

const defaultBasicInfo: StaffBasicInfo = {
  workerId: 0,
  name: "",
  ruby: "",
  birth: "",
  gender: "",
  phoneNumber: "",
  zipCode: "",
  address: "",
  affiliation: "",
  occupation: "",
  enrollmentAt: "",
  resignationAt: "",
  resignationReason: "",
  commutingAllowance: 0,
  meansOfTransportation: "",
  oneWayDistance: 0,
  dependentDeducationFlg: false,
  numberOfDependents: 0,
  unemployeeInsuranceFlg: false,
  socialInsuranceFlg: false,
  remarks: "",
};

const defaultSalaryInfo: StaffSalaryInfo = {
  qualification: "",
  area: "",
  type: "",
  post: "",
  grade: 0,
  workingDays: 0,
  workingHour: 0,
  regularSalary: {
    salary: 0,
    basicSalary: 0,
    qualificationAllowance: 0,
    areaAllowance: 0,
    postAllowance: 0,
    adjustmentAllowance: 0,
  },
  partTimeSalary: {
    hourlyWage: 0,
    qualificationWage: 0,
    enrollmentWage: 0,
    areaWage: 0,
    evaluationWage: 0,
    adjustmentWage: 0,
  },
  evaluation: {
    summerEvaluation: "",
    winterEvaluation: "",
  },
  diverseWorkOptions: {
    requestedDayoff: false,
    earlyShift: false,
    lateShift: false,
    saturdayDayoff: false,
    existingTransfar: false,
    newTransfar: false,
    summerVacation: false,
    newYearVacation: false,
    yearEndVacation: false,
    startFiscalYearVacation: false,
    endFiscalYearVacation: false,
  },
};

export default function StaffInfoPage() {
  const { data: session } = useSession();

  const [basicInfo, setBasicInfo] = useState<StaffBasicInfo>(defaultBasicInfo);
  const [salaryInfo, setSalaryInfo] = useState<StaffSalaryInfo>(defaultSalaryInfo);
  const [careers, setCareers] = useState<CareerEntry[]>([]);
  const [employeeBasicSalary, setEmployeeBasicSalary] = useState<EmployeeBasicSalary[]>([]);
  const [areaAllowance, setAreaAllowance] = useState<AreaAllowance[]>([]);
  const [enrollmentWage, setEnrollmentWage] = useState<EnrollmentWage[]>([]);
  const [hourlyWage, setHourlyWage] = useState<HourlyWage[]>([]);
  const [qualificationAllowance, setQualificationAllowance] = useState<QualificationAllowance[]>(
    []
  );
  const [postAllowance, setPostAllowance] = useState<PostAllowance[]>([]);
  const [isCalculation, setIsCalculation] = useState(false);

  const fetchSalaryInfo = async () => {
    const response = await fetch("/json/worker-system/w_employee_basic_salary.json");
    const data = await response.json();
    setEmployeeBasicSalary(data);

    const response2 = await fetch("/json/worker-system/w_area_allowance.json");
    const data2 = await response2.json();
    setAreaAllowance(data2);

    const response3 = await fetch("/json/worker-system/w_enrollment_wage.json");
    const data3 = await response3.json();
    setEnrollmentWage(data3);

    const response4 = await fetch("/json/worker-system/w_houtly_wage.json");
    const data4 = await response4.json();
    setHourlyWage(data4);

    const response5 = await fetch("/json/worker-system/w_qualification_allowance.json");
    const data5 = await response5.json();
    setQualificationAllowance(data5);

    const response6 = await fetch("/json/worker-system/w_post_allowance.json");
    const data6 = await response6.json();
    setPostAllowance(data6);
  };

  const fetchStaffInfo = async (workerId: number) => {
    try {
      const response = await fetch(`/api/staff-info/get/${workerId}`);
      if (!response.ok) {
        if (response.status === 404) {
          // 職員が見つからない場合は初期値をセット
          setBasicInfo(defaultBasicInfo);
          setSalaryInfo(defaultSalaryInfo);
          setCareers([]);
          return;
        }
        handleApiError(response);
        throw new Error("職員情報の取得に失敗しました");
      }
      const data = (await response.json()) as StaffInfoResponse;

      // 取得したデータをセット
      setBasicInfo({
        ...basicInfo,
        name: data.personal.name,
        ruby: data.personal.ruby,
        birth: data.personal.birth ? new Date(data.personal.birth).toISOString().split("T")[0] : "",
        gender: data.personal.gender || "",
        phoneNumber: data.personal.phoneNumber || "",
        zipCode: data.personal.zipcode || "",
        address: data.personal.address || "",
        affiliation: data.personal.affiliation || "",
        occupation: data.welfareBenefits?.occupation || "",
        enrollmentAt: data.welfareBenefits?.enrollmentAt
          ? new Date(data.welfareBenefits.enrollmentAt).toISOString().split("T")[0]
          : "",
        resignationAt: data.welfareBenefits?.resignationAt
          ? new Date(data.welfareBenefits.resignationAt).toISOString().split("T")[0]
          : "",
        resignationReason: data.welfareBenefits?.resignationReason || "",
        commutingAllowance: data.welfareBenefits?.commutingAllowance || 0,
        meansOfTransportation: data.welfareBenefits?.meansOfTransportation || "",
        oneWayDistance: data.welfareBenefits?.oneWayDistance || 0,
        dependentDeducationFlg: data.welfareBenefits?.dependentDeducationFlg || false,
        numberOfDependents: data.welfareBenefits?.numberOfDependents || 0,
        unemployeeInsuranceFlg: data.welfareBenefits?.unemployeeInsuranceFlg || false,
        socialInsuranceFlg: data.welfareBenefits?.socialInsuranceFlg || false,
        remarks: data.personal.remarks || "",
      });

      setSalaryInfo({
        ...salaryInfo,
        type: data.evaluation?.type || "",
        area: data.evaluation?.area || "",
        post: data.evaluation?.post || "",
        qualification: data.evaluation?.qualification || "",
        grade: data.evaluation?.grade || 0,
        workingDays: data.evaluation?.workingDays || 0,
        workingHour: data.evaluation?.workingHour || 0,
        regularSalary: {
          salary: data.salary?.salary || 0,
          basicSalary: data.salary?.basicSalary || 0,
          qualificationAllowance: data.salary?.qualificationAllowance || 0,
          areaAllowance: data.salary?.areaAllowance || 0,
          postAllowance: data.salary?.postAllowance || 0,
          adjustmentAllowance: data.salary?.adjustmentAllowance || 0,
        },
        partTimeSalary: {
          hourlyWage: data.salary?.hourlyWage || 0,
          qualificationWage: data.salary?.qualificationWage || 0,
          enrollmentWage: data.salary?.enrollmentWage || 0,
          areaWage: data.salary?.areaWage || 0,
          evaluationWage: data.salary?.evaluationWage || 0,
          adjustmentWage: data.salary?.adjustmentWage || 0,
        },
        diverseWorkOptions: {
          requestedDayoff: data.evaluation?.requestedDayoff || false,
          earlyShift: data.evaluation?.earlyShift || false,
          lateShift: data.evaluation?.lateShift || false,
          saturdayDayoff: data.evaluation?.saturdayDayoff || false,
          existingTransfar: data.evaluation?.existingTransfar || false,
          newTransfar: data.evaluation?.newTransfar || false,
          summerVacation: data.evaluation?.summerVacation || false,
          newYearVacation: data.evaluation?.newYearVacation || false,
          yearEndVacation: data.evaluation?.yearEndVacation || false,
          startFiscalYearVacation: data.evaluation?.startFiscalYearVacation || false,
          endFiscalYearVacation: data.evaluation?.endFiscalYearVacation || false,
        },
        evaluation: {
          summerEvaluation: data.evaluation?.summerEvaluation?.toString() || "",
          winterEvaluation: data.evaluation?.winterEvaluation?.toString() || "",
        },
      });

      setCareers(
        data.careers?.map((career: Career) => ({
          enrollmentAt: new Date(career.enrollmentAt).toISOString().split("T")[0],
          resignationAt: new Date(career.resignationAt).toISOString().split("T")[0],
          occupation: career.occupation,
          companyName: career.companyName,
        })) || []
      );
    } catch (error) {
      console.error("職員情報の取得に失敗しました:", error);
      alert("職員情報の取得に失敗しました");
    }
  };

  const handleCalculation = () => {
    if (!salaryInfo.type) {
      alert("雇用形態を選択してください");
      return;
    }
    if (!salaryInfo.area) {
      alert("地域を入力してください");
      return;
    }
    if (!salaryInfo.post) {
      alert("役職を入力してください");
      return;
    }
    if (!salaryInfo.grade) {
      alert("等級を入力してください");
      return;
    }
    if (!salaryInfo.workingDays) {
      alert("所定日数を入力してください");
      return;
    }
    if (!salaryInfo.workingHour) {
      alert("所定時間を入力してください");
      return;
    }

    const employeeBasicSalaryData = employeeBasicSalary.find(
      (item) =>
        item.type === salaryInfo.type &&
        item.grade === Number(salaryInfo.grade) &&
        item.post === salaryInfo.post
    );
    const areaAllowanceData = areaAllowance.find(
      (item) => item.type === salaryInfo.type && item.area === salaryInfo.area
    );

    const qualificationAllowanceData = qualificationAllowance[0].type[salaryInfo.type].find(
      (item) => item.qualification === salaryInfo.qualification
    );

    if (
      salaryInfo.type === "正社員" ||
      salaryInfo.type === "短時間正社員" ||
      salaryInfo.type === "多様な正社員"
    ) {
      const postAllowanceData = postAllowance[0].type[salaryInfo.type].find(
        (item) => item.post === salaryInfo.post
      );

      const monthlySalary =
        (employeeBasicSalaryData?.basic_salary || 0) +
        (qualificationAllowanceData?.allowance || 0) +
        (areaAllowanceData?.allowance || 0) +
        (postAllowanceData?.allowance || 0);

      setSalaryInfo({
        ...salaryInfo,
        regularSalary: {
          ...salaryInfo.regularSalary,
          salary: monthlySalary,
          basicSalary: employeeBasicSalaryData?.basic_salary || 0,
          qualificationAllowance: qualificationAllowanceData?.allowance || 0,
          areaAllowance: areaAllowanceData?.allowance || 0,
          postAllowance: postAllowanceData?.allowance || 0,
          adjustmentAllowance: 0,
        },
        partTimeSalary: {
          hourlyWage: 0,
          qualificationWage: 0,
          enrollmentWage: 0,
          areaWage: 0,
          evaluationWage: 0,
          adjustmentWage: 0,
        },
      });
    } else {
      const enrollmentWageData = enrollmentWage.find((item) => item.period === 2);

      const hourlyWageData = hourlyWage[0].area[salaryInfo.area];

      const wage =
        hourlyWageData.basic_hourly_wage +
        (qualificationAllowanceData?.allowance || 0) +
        (enrollmentWageData?.wage || 0) +
        (areaAllowanceData?.allowance || 0) +
        (employeeBasicSalaryData?.basic_salary || 0);

      setSalaryInfo({
        ...salaryInfo,
        regularSalary: {
          salary: 0,
          basicSalary: 0,
          qualificationAllowance: 0,
          areaAllowance: 0,
          postAllowance: 0,
          adjustmentAllowance: 0,
        },
        partTimeSalary: {
          ...salaryInfo.partTimeSalary,
          hourlyWage: wage,
          qualificationWage: qualificationAllowanceData?.allowance || 0,
          enrollmentWage: enrollmentWageData?.wage || 0,
          areaWage: areaAllowanceData?.allowance || 0,
          evaluationWage: employeeBasicSalaryData?.basic_salary || 0,
          adjustmentWage: 0,
        },
      });
    }

    setIsCalculation(true);
  };

  const getPeriod = (startDate: string, endDate: string) => {
    if (startDate === "" || endDate === "") {
      return 0;
    }

    const hireDate = new Date(startDate);
    const resignationDate = new Date(endDate);

    if (hireDate > resignationDate) {
      return 0;
    }

    const period =
      resignationDate.getFullYear() -
      hireDate.getFullYear() +
      (resignationDate.getMonth() - hireDate.getMonth()) / 12;
    return period;
  };

  const getGradeFromCareers = (position: string, grade: number) => {
    return position === "常勤保育士" || position === "常勤調理"
      ? Math.floor(grade)
      : position === "非常勤保育士" || position === "常勤保育補助" || position === "非常勤調理"
      ? Math.floor(grade / 2)
      : position === "非常勤保育補助"
      ? Math.floor(grade / 3)
      : 0;
  };

  const handleReflect = () => {
    let grade = 0;
    careers.forEach((career) => {
      grade += getGradeFromCareers(
        career.occupation,
        getPeriod(career.enrollmentAt, career.resignationAt)
      );
    });

    if (salaryInfo.post !== "一般") {
      if (0 < grade && 12 < grade + 3) {
        grade = 12;
      } else {
        grade = 3;
      }
    } else {
      if (3 < grade / 2.5) {
        grade = 20 < Math.floor(grade / 2.5) ? 20 : Math.floor(grade / 2.5);
      } else {
        grade = 3;
      }
    }

    setSalaryInfo({
      ...salaryInfo,
      grade: grade,
    });
  };

  const handleRegister = async () => {
    if (basicInfo.name === "") {
      alert("名前を入力してください");
      return;
    }
    if (basicInfo.ruby === "") {
      alert("フリガナを入力してください");
      return;
    }

    if (!isCalculation) {
      const result = confirm("計算が実行されていませんが、登録してよろしいでしょうか。");
      if (!result) {
        return;
      }
    }

    try {
      const response = await fetch(`/api/staff-info/register`, {
        method: "POST",
        body: JSON.stringify({
          basicInfo,
          salaryInfo,
          careers,
          userName: session?.user?.name || "",
        }),
      });
      if (!response.ok) {
        handleApiError(response);
        throw new Error("データの登録に失敗しました");
      }
      const data = await response.json();
      alert("登録が完了しました");
      setBasicInfo((prev) => ({ ...prev, workerId: data.workerId }));
      setIsCalculation(false);
    } catch (error) {
      console.error("データの登録に失敗しました:", error);
    }
  };

  // 職員番号が変更されたときの処理
  useEffect(() => {
    if (basicInfo.workerId !== 0) {
      fetchStaffInfo(basicInfo.workerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basicInfo.workerId]);

  useEffect(() => {
    fetchSalaryInfo();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">職員情報</h1>
        <div className="flex gap-2">
          <button
            onClick={handleCalculation}
            className="px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200"
          >
            計算
          </button>
          <button
            onClick={handleReflect}
            className="px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200"
          >
            等級反映
          </button>
          <button
            onClick={handleRegister}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            登録
          </button>
        </div>
      </div>
      <StaffInfoForm
        basicInfo={basicInfo}
        setBasicInfo={setBasicInfo}
        salaryInfo={salaryInfo}
        setSalaryInfo={setSalaryInfo}
        careers={careers}
        setCareers={setCareers}
      />
    </div>
  );
}
