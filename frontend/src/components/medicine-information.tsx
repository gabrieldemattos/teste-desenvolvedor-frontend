interface MedicineInformationProps {
  dataName: string;
  dataInformation: string[] | string;
}

const MedicineInformation = ({
  dataName,
  dataInformation,
}: MedicineInformationProps) => {
  return (
    <>
      <p className="information">
        {dataName} <span>{dataInformation}</span>
      </p>
    </>
  );
};

export default MedicineInformation;
