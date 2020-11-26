package com.mecanica.org.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A BitacoraAveria.
 */
@Entity
@Table(name = "bitacora_averia")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class BitacoraAveria implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "fecha_bitacora")
    private LocalDate fechaBitacora;

    @ManyToOne
    @JsonIgnoreProperties(value = "bitacoraAverias", allowSetters = true)
    private Averia averia;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public BitacoraAveria descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDate getFechaBitacora() {
        return fechaBitacora;
    }

    public BitacoraAveria fechaBitacora(LocalDate fechaBitacora) {
        this.fechaBitacora = fechaBitacora;
        return this;
    }

    public void setFechaBitacora(LocalDate fechaBitacora) {
        this.fechaBitacora = fechaBitacora;
    }

    public Averia getAveria() {
        return averia;
    }

    public BitacoraAveria averia(Averia averia) {
        this.averia = averia;
        return this;
    }

    public void setAveria(Averia averia) {
        this.averia = averia;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BitacoraAveria)) {
            return false;
        }
        return id != null && id.equals(((BitacoraAveria) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BitacoraAveria{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", fechaBitacora='" + getFechaBitacora() + "'" +
            "}";
    }
}
