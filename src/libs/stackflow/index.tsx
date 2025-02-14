import { stackflow } from "@stackflow/react";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import { mobileRoutes } from "@/mobileRoutes";
import {
  AddProfilePhotoContainer as AddProfilePhoto,
  LoginContainer as Login,
  SetupProfileContainer as SetupProfile,
  SetupTeamContainer as SetupTeam,
  CreateTeamProfileContainer as SetupTeam1,
  AddTeamWarehouseContainer as SetupTeam2,
  AddTeamStoreContainer as SetupTeam3,
  AddTeamMemberContainer as SetupTeam4,
  SetupDoneContainer as SetupTeamDone,
  StartWithEmailContainer as StartWithEmail,
  LoginWithEmailContainer as LoginWithEmail,
  SignUpWithEmailContainer as SignUpWithEmail,
  SplashScreenContainer as SplashScreen,
  ProfileSettingContainer as ProfileSetting,
  TeamInfoContainer as TeamInfo,
  EditTeamContainer as EditTeam,
  MyPageContainer as MyPage,
  WarehouseContainer as WarehousePage,
  PropertyContainer as Property,
  StoreContainer as StorePage,
  SupplierContainer as SupplierPage,
  SupplierDetailContainer as SupplierDetailPage,
  MyAddMemberContainer as MyAddMemberPage,
  SelectRoleContainer as SelectRolePage,
  MembersContainer as MembersPage,
  SupplierFormContainer as SupplierFormPage,
  SelectLanguageContainer as SelectLanguagePage,
  PropertyItemContainer as PropertyItem,
  JoinGoogle,
  JoinKakao,
  JoinNaver,
  JoinApple,
} from "@/mobilePages";

export const { Stack, useFlow, activities } = stackflow({
  transitionDuration: 350,
  activities: {
    Login,
    JoinGoogle,
    JoinKakao,
    JoinNaver,
    JoinApple,
    SetupProfile,
    AddProfilePhoto,
    SetupTeam,
    SetupTeam1,
    SetupTeam2,
    SetupTeam3,
    SetupTeam4,
    SetupTeamDone,
    StartWithEmail,
    LoginWithEmail,
    SignUpWithEmail,
    SplashScreen,
    WarehousePage,
    ProfileSetting,
    TeamInfo,
    EditTeam,
    MyPage,
    StorePage,
    SupplierPage,
    SupplierDetailPage,
    MyAddMemberPage,
    SelectRolePage,
    MembersPage,
    SupplierFormPage,
    SelectLanguagePage,
    PropertyItem,
    Property,
  },
  plugins: [
    // () => {
    //   return {
    //     key: "my-plugin",
    //     render({ stack }) {
    //       return (
    //         <div className="my-rendering">
    //           <AppProvider>
    //             {stack.render().activities.map((activity) => {
    //               console.log(activity);
    //               return (
    //                 <div className="my-activity h-screen max-h-screen" key={activity.id}>
    //                   {activity.render()}
    //                 </div>
    //               );
    //             })}
    //           </AppProvider>
    //         </div>
    //       );
    //     },
    //   };
    // },
    basicRendererPlugin(),
    basicUIPlugin({
      theme: "cupertino",
    }),
    historySyncPlugin({
      routes: { ...mobileRoutes },
      fallbackActivity: () => "SplashScreen",
    }),
  ],
});
