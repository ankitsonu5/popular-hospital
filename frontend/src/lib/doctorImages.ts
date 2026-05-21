import { getImageUrl, type Doctor } from "@/lib/api";
import { localDoctors } from "@/lib/localDoctors";

const PUBLIC_DOCTOR_IMAGES: Record<string, string> = {
  "dr-a-k-kaushik": "/images/departments_doctor/dr_ak_kaushik.jpg",
  "dr-abhishek-kumar": "/images/departments_doctor/dr_abhishek_kumar.jpg",
  "dr-kiran-kaushik": "/images/departments_doctor/dr_kiran_kaushik.png",
  "dr-gunjan-rana": "/images/departments_doctor/dr_gunjan_rana.jpg",
  "dr-priyanka-jaiswal": "/images/departments_doctor/dr_priyanka_jaiswal.jpg",
  "dr-madhavi-paramar": "/images/departments_doctor/madhvi_parmar.jpg",
  "dt-sayeda-eram-fatma": "/images/departments_doctor/dt._sayeda_eram_fatma.jpeg",
  "dt-sakshi-pandey": "/images/departments_doctor/dt_sakshi_pandey.jpg",
  "dr-harendra-ojha": "/images/departments_doctor/dr_harendra_ojha.jpg.jpeg",
  "dr-tejas-mahajan": "/images/departments_doctor/dr_tejas_mahajan.jpg.jpeg",
  "dr-shailesh-kumar-yadav": "/images/departments_doctor/dr_shailesh_kumar_yadav.jpg",
  "dr-akanksha-chaturvedi": "/images/departments_doctor/dr_akanksha_chaturvedi.jpg",
  "dr-harmohan-sahu": "/images/departments_doctor/dr_harmohan_sahu.jpg",
  "dr-srishti-tanya": "/images/departments_doctor/dr._srishti_tanya.jpg",
  "dr-a-k-pradhan": "/images/departments_doctor/dr_a_k_pradhan.jpg",
  "dr-deepak-agrahari": "/images/departments_doctor/dr_deepak_agrahari.jpg",
  "dr-sudhir-singh": "/images/departments_doctor/dr_sudhir_singh.jpg",
  "dr-hari-krishan-srivastava":
    "/images/departments_doctor/dr-Hari-Krishan-Srivastava.jpg",
  "dr-manoj-sharma": "/images/departments_doctor/dr-Manoj-Sharma.jpg",
  "dr-hena-kauser": "/images/departments_doctor/dr_heena_kauser.jpg",
  "dr-anirban-de": "/images/departments_doctor/dr_anirban_de.png",
  "dr-rohan-kumar-singh": "/images/departments_doctor/rohan_kr_singh.jpg",
  "dr-mahesh-tiwari": "/images/departments_doctor/dr_mahesh_tiwari.jpg",
  "dr-k-p-singh": "/images/departments_doctor/dr_k_p_singh.jpg",
  "dr-p-k-tiwari": "/images/departments_doctor/dr_pk_tiwari.jpg",
  "dr-sandesh-m-raykar": "/images/departments_doctor/dr_sandesh_m_raykar.jpg",
  "dr-harendra-pratap-singh": "/images/departments_doctor/harendra_pratap.jpg",
  "dr-kamlesh-kumar-singh":
    "/images/departments_doctor/dr._kamlesh_kumar_Singh.jpg",
  "dr-ajay-kumar-prajapati": "/images/departments_doctor/dr_ajay_prajapati.jpg",
  "dr-md-akhtar-ali-ansari":
    "/images/departments_doctor/dr_ohd_akhtar_ali_ansari.jpg",
  "dr-vinit-yadav": "/images/departments_doctor/vinit_yadav.jpg",
  "dr-piyush-hari": "/images/departments_doctor/dr_piyush_hari.jpg",
  "dr-alok-c-bhardwaj": "/images/departments_doctor/dr._alok_c_bhardwaj.jpg",
  "dr-greeshma-suresh": "/images/departments_doctor/dr_greeshma_suresh.jpg",
  "dr-prabhat-kumar": "/images/departments_doctor/dr_prabhat_kumar.jpg",
  "dr-rajesh-kumar-singh": "/images/departments_doctor/dr_rajesh_kumar_singh.jpg",
  "dr-neha-gupta": "/images/departments_doctor/dr_neha_gupta.png",
  "dr-omkareshwar-pratap-singh": "/images/departments_doctor/dr_omkareshwar.jpg",
  "dr-shailendra-shivhare": "/images/departments_doctor/dr_sailendra shivhare.jpg",
  "dr-vikas-jaiswal": "/images/departments_doctor/dr_vikas_jaiswal.jpg",
  "dr-dinesh-singh": "/images/departments_doctor/dr-dinesh-singh.jpg",
  "dr-piyush-kumar-saini": "/images/departments_doctor/dr_piyush_saini.jpg",
};

export const getDoctorImageCandidates = (doctor: Doctor) =>
  Array.from(
    new Set(
      [
        PUBLIC_DOCTOR_IMAGES[doctor.slug],
        localDoctors[doctor.slug]?.image,
        doctor.image_url ? getImageUrl(doctor.image_url) : "",
      ].filter(Boolean),
    ),
  );

export const getPrimaryDoctorImage = (doctor: Doctor) =>
  getDoctorImageCandidates(doctor)[0] || null;
