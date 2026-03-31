import { Link } from "react-router-dom";
import { useEcommerce } from "../../context/EcommerceContext";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserAddressAsync,
  clearError,
} from "../../features/address/addressSlice";
import ErrorModal from "../../components/ErrorModal";

/* ── helper: initials from a name ── */
const getInitials = (name = "") =>
  name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

const AllAddress = () => {
  const [addressId, setAddressId] = useState(null);
  const { handleSelectDefaultAddress } = useEcommerce();
  const { address, fetchUserAddressLoading, error, setDefaultAddressLoading } =
    useSelector((state) => state.address);
  const dispatch = useDispatch();

  const selectDefaultAddress = async (id) => {
    setAddressId(id);
    handleSelectDefaultAddress(id);
  };

  useEffect(() => {
    const handleGetUserAddress = async () => {
      try {
        await dispatch(fetchUserAddressAsync()).unwrap();
      } catch (err) {
        console.log(err);
      }
    };
    handleGetUserAddress();
  }, [dispatch]);

  return (
    <>
      {fetchUserAddressLoading === "loading" ? (
        <Loading />
      ) : (
        <div
          className="min-vh-100 py-4 py-md-5"
          style={{ background: "var(--bs-light)", marginBottom: "5em" }}
        >
          <div className="container-lg px-3 px-md-4">
            {error && (
              <ErrorModal
                message={error}
                onClose={() => dispatch(clearError())}
              />
            )}

            {/* ── Top Nav ── */}
            <div className="d-flex align-items-center justify-content-between mb-4 gap-2">
              <Link
                to="/user"
                className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2 rounded-3 fw-semibold"
              >
                <i className="bi bi-arrow-left"></i>
                <span className="d-none d-sm-inline">Back to Profile</span>
                <span className="d-sm-none">Back</span>
              </Link>

              <Link
                to="addAddress"
                state={{ from: "/address" }}
                className="btn btn-primary btn-sm d-flex align-items-center gap-2 rounded-3 fw-semibold"
              >
                <i className="bi bi-plus-circle-fill"></i>
                <span className="d-none d-sm-inline">Add Address</span>
                <span className="d-sm-none">Add</span>
              </Link>
            </div>

            {/* ── Page Header ── */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 bg-primary flex-shrink-0"
                style={{ width: 44, height: 44 }}
              >
                <i className="bi bi-geo-alt-fill text-white fs-5"></i>
              </div>
              <div>
                <h5 className="fw-bold mb-0 text-dark">
                  Delivery Addresses{" "}
                  <span className="text-primary fw-semibold fs-6">
                    ({address?.length || 0})
                  </span>
                </h5>
                <small className="text-muted">
                  Manage your shipping addresses
                </small>
              </div>
            </div>

            {/* ── Address Grid ── */}
            {address && address.length > 0 ? (
              <div className="row g-3 g-md-4 row-cols-1 row-cols-md-2">
                {address.map((userAdd) => (
                  <div className="col" key={userAdd.id}>
                    <div
                      className="card h-100 rounded-4 overflow-hidden"
                      style={
                        userAdd.isDefault
                          ? {
                              border: "2px solid #4f46e5",
                              boxShadow: "0 0 0 4px rgba(79,70,229,0.08)",
                            }
                          : {
                              border: "1px solid #e5e7eb",
                              boxShadow: "none",
                            }
                      }
                    >
                      {/* ── Top accent bar / Default banner ── */}
                      {userAdd.isDefault ? (
                        /* Full-width coloured banner — impossible to miss */
                        <div
                          className="d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold"
                          style={{
                            background: "#4f46e5",
                            color: "#fff",
                            fontSize: "0.78rem",
                            letterSpacing: "0.02em",
                          }}
                        >
                          <i
                            className="bi bi-patch-check-fill"
                            style={{ fontSize: 13 }}
                          ></i>
                          Default delivery address
                        </div>
                      ) : (
                        /* Thin neutral bar so non-default cards have the same height structure */
                        <div
                          style={{ height: 4, background: "#e5e7eb" }}
                        />
                      )}

                      <div className="card-body p-3 p-md-4">
                        {/* ── Name + avatar row ── */}
                        <div className="d-flex align-items-center gap-3 mb-3">
                          {/* Initials avatar — purple tint for default, gray for others */}
                          <div
                            className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0 fw-semibold"
                            style={{
                              width: 40,
                              height: 40,
                              fontSize: "0.82rem",
                              background: userAdd.isDefault
                                ? "#ede9fe"
                                : "#f3f4f6",
                              color: userAdd.isDefault ? "#4f46e5" : "#6b7280",
                            }}
                          >
                            {getInitials(userAdd.name)}
                          </div>
                          <div className="min-w-0 flex-grow-1">
                            <p
                              className="fw-bold mb-0 text-truncate text-dark"
                              style={{ fontSize: "0.95rem" }}
                            >
                              {userAdd.name}
                            </p>
                            {/* Status chip — clearly labels the address type */}
                            {userAdd.isDefault ? (
                              <span
                                className="badge rounded-pill d-inline-flex align-items-center gap-1"
                                style={{
                                  fontSize: "0.65rem",
                                  background: "#ede9fe",
                                  color: "#3730a3",
                                  border: "1px solid #c4b5fd",
                                  fontWeight: 500,
                                }}
                              >
                                <i className="bi bi-check-circle-fill"></i>
                                Default
                              </span>
                            ) : (
                              <span
                                className="badge rounded-pill"
                                style={{
                                  fontSize: "0.65rem",
                                  background: "#f3f4f6",
                                  color: "#6b7280",
                                  border: "1px solid #e5e7eb",
                                  fontWeight: 400,
                                }}
                              >
                                Saved address
                              </span>
                            )}
                          </div>
                        </div>

                        {/* ── Contact detail rows ── */}
                        <div className="d-flex flex-column gap-2 mb-3">
                          <div className="d-flex align-items-center gap-2">
                            <i
                              className="bi bi-telephone-fill text-muted flex-shrink-0"
                              style={{ fontSize: "0.78rem", opacity: 0.6 }}
                            ></i>
                            <span
                              className="text-muted"
                              style={{ fontSize: "0.82rem" }}
                            >
                              {userAdd.phoneNumber}
                            </span>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <i
                              className="bi bi-mailbox text-muted flex-shrink-0"
                              style={{ fontSize: "0.78rem", opacity: 0.6 }}
                            ></i>
                            <span
                              className="text-muted"
                              style={{ fontSize: "0.82rem" }}
                            >
                              {userAdd.zipCode} · {userAdd.city} ·{" "}
                              {userAdd.state}
                            </span>
                          </div>
                          <div className="d-flex align-items-start gap-2">
                            <i
                              className="bi bi-geo-alt-fill text-muted flex-shrink-0 mt-1"
                              style={{ fontSize: "0.78rem", opacity: 0.6 }}
                            ></i>
                            <span
                              className="text-muted"
                              style={{ fontSize: "0.82rem", lineHeight: 1.5 }}
                            >
                              {userAdd.fullAddress}
                            </span>
                          </div>
                        </div>

                        <hr
                          className="my-3"
                          style={{ borderColor: "#e5e7eb" }}
                        />

                        {/* ── Action buttons ── */}
                        {userAdd.isDefault ? (
                          /*
                           * Default address — only Edit makes sense.
                           * Uses the indigo accent so it reads as the card's primary action.
                           */
                          <Link
                            to={`${userAdd.id}`}
                            state={{ from: "/user" }}
                            className="btn btn-sm w-100 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2"
                            style={{
                              fontSize: "0.82rem",
                              padding: "9px 14px",
                              background: "#ede9fe",
                              color: "#3730a3",
                              border: "1.5px solid #c4b5fd",
                            }}
                          >
                            <i className="bi bi-pencil-fill" style={{ fontSize: 11 }}></i>
                            Edit address
                          </Link>
                        ) : (
                          /*
                           * Non-default — two equal-weight buttons side by side.
                           * "Set as default" uses the indigo outline so it stands out
                           * as the meaningful action, "Edit" stays secondary.
                           */
                          <div className="d-flex gap-2">
                            <Link
                              to={`${userAdd.id}`}
                              state={{ from: "/address" }}
                              className="btn btn-outline-secondary btn-sm flex-fill rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-1"
                              style={{ fontSize: "0.8rem", padding: "8px 10px" }}
                            >
                              <i
                                className="bi bi-pencil-fill"
                                style={{ fontSize: 11 }}
                              ></i>
                              Edit
                            </Link>

                            <button
                              onClick={() => selectDefaultAddress(userAdd.id)}
                              disabled={
                                userAdd.id === addressId &&
                                setDefaultAddressLoading === "loading"
                              }
                              className="btn btn-sm flex-fill rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-1"
                              style={{
                                fontSize: "0.8rem",
                                padding: "8px 10px",
                                background: "#ede9fe",
                                color: "#3730a3",
                                border: "1.5px solid #c4b5fd",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {userAdd.id === addressId &&
                              setDefaultAddressLoading === "loading" ? (
                                <>
                                  Setting…{" "}
                                  <span className="spinner-border spinner-border-sm ms-1"></span>
                                </>
                              ) : (
                                <>
                                  <i
                                    className="bi bi-check-circle-fill"
                                    style={{ fontSize: 11 }}
                                  ></i>
                                  Set as default
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* ── Empty State ── */
              <div className="card border-0 text-center rounded-4 shadow-sm">
                <div className="card-body py-5 px-4">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 mb-4"
                    style={{ width: 80, height: 80 }}
                  >
                    <i
                      className="bi bi-geo-alt text-primary"
                      style={{ fontSize: 32 }}
                    ></i>
                  </div>
                  <h5 className="fw-bold mb-2 text-dark">No Addresses Yet</h5>
                  <p className="text-muted mb-4 small">
                    Add your first delivery address to start shopping
                  </p>
                  <Link
                    to="addAddress"
                    className="btn btn-primary fw-semibold px-4 py-2 rounded-3"
                  >
                    <i className="bi bi-plus-circle-fill me-2"></i>
                    Add Your First Address
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AllAddress;